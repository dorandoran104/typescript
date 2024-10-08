const section = document.querySelector('.section');
const write_btn = document.querySelector('.write_btn')
const file_input = section.querySelector('input[type="file"]');
let fileArr = [];
const imageFilePattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;

const totalPriceInput = document.querySelector('.section input[name="total_price"]');
const priceInput = document.querySelector('.section input[name="price"]');
const taxInput = document.querySelector('.section input[name="tax"]');

//가격 입력시 자동입력
priceInput.addEventListener('input',(e)=>{
  e.target.setAttribute('maxlength','13');
  let value = e.target.value.replaceAll(',','');
  e.target.value = addCommasToNumber(value)

  const tax = parseInt(value / 10);
  taxInput.value = addCommasToNumber(tax);

  totalPriceInput.value = addCommasToNumber(Number(value) + Number(tax));
})

//총 가격 입력시 자동 입력
totalPriceInput.addEventListener('input',(e)=>{
  e.target.setAttribute('maxlength','13');
  let value = e.target.value.replaceAll(',','');
  e.target.value = addCommasToNumber(value);

  const price = parseInt(Math.round(value / 1.1));
  priceInput.value = addCommasToNumber(price);
  taxInput.value = addCommasToNumber(Number(value) - Number(price))
})

//부가세 입력시 자동 입력
taxInput.addEventListener('input',(e)=>{
  e.target.setAttribute('maxlength','13');
  const value = e.target.value.replaceAll(',','');
  e.target.value = addCommasToNumber(value);

  const price = parseInt(value * 10);
  priceInput.value = addCommasToNumber(price);
  totalPriceInput.value = addCommasToNumber(Number(price) + Number(value));
})

//카테고리 추가
async function change_first_category(el){
  const ancestor_idx = el.getAttribute('data-value')
  let data = await customFetch('/admin/category/getDescendantList','post',{ancestor_idx : ancestor_idx});
  if(data.promiseResult && data.result){
    const secondCategory = document.querySelector('.second_category');
    secondCategory.innerHTML = '';
    data.data.forEach((data1)=>{
      secondCategory.innerHTML+= `<a class="pointer" herf="javascript:void(0)" data-value="${data1.idx}" onclick="change_second_category(this)">${data1.name}</a>`
    })
  }
  el.closest('.dropdown-content').setAttribute('data-value',el.getAttribute('data-value'));
  if(!data.promiseResult || !data.result){
    if(data.errMessage != null && data.errMessage != ''){
      customAlert(data.errMessage);
      return false;
    }
    customAlert('오류가 발생했습니다.');
    return false;
  }
}

function change_second_category(el){
  const parent = el.closest('.dropdown-content');
  parent.setAttribute('data-value',el.getAttribute('data-value'));
}

//파일 추가시
file_input.addEventListener('change',(e)=>{
  let file = e.target.files[0];

  if(!imageFilePattern.test(file.name)){
      alert('이미지 파일만 등록할 수 있습니다.');
      e.target.value = '';
      return false;
  }

  if(file.size == 0){
      alert('유효하지 않은 파일을 업로드 할 수 없습니다.');
      e.target.value = '';
      return false;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
      let imageTemplate = `
        <div class="image-container col-sm-4">
          <img/>
          <div class="overlay" onclick="delete_file(this)"> x </div>
        </div>
      `
      const imgElement = document.querySelector('.img_area .row');
      imgElement.innerHTML+=imageTemplate;
      const images = imgElement.querySelectorAll('img');
      images[images.length -1].src = e.target.result;
  };

  fileArr.push(file);
})

function delete_file(el){
  let target = el.closest('.image-container');
  let images = document.querySelectorAll('.image-container');
  let index = -1;
  images.forEach((el1,i)=>{
    if(el1 == target) index = i;
  })
  
  fileArr.splice(index,1);
  target.remove();
}

/* 저장 */
write_btn.onclick = ()=>{
  let param = {};

  const inputs = section.querySelectorAll('input[type="text"]');
  let formData = new FormData();

  for(let i = 0; i<inputs.length ; i++){
    const input = inputs[i];
    if(input.value == null || input.value == ''){
      customAlert('빈값이 존재합니다.',input);
      return false;
    }
    formData.append(input.getAttribute('name'),input.value);
  }

  const checkbox = section.querySelectorAll('input[type="checkbox"]');
  checkbox.forEach((el)=>{
    formData.append(el.getAttribute('name'),el.checked ? 'Y' : 'N');
  })

  const selectBox = section.querySelectorAll('.dropdown-content');
  for(let i = 0; i<selectBox.length ; i++){
    const value = selectBox[i].getAttribute('data-value');
    if(value == null || value == ''){
      customSelectAlert('카테고리를 선택해 주세요',selectBox[i])
      return false;
    }
    formData.append(selectBox[i].getAttribute('name'),selectBox[i].getAttribute('data-value'));
  }

  if(fileArr.length > 0){
    fileArr.forEach((file)=>{
      formData.append('file',file);
    })
  }

  customConfirm('저장하시겠습니까?',async ()=>{
    let data = await customFormDataFetch('/admin/goods/write',formData);
    if(data.promiseResult && data.result){
      customSuccessAlert('저장되었습니다.','/admin/goods')
    }
    if(!data.promiseResult || !data.result){
      if(data.errMessage != null && data.errMessage != ''){
        customAlert(data.errMessage);
        return false;
      }
      customAlert('오류가 발생하였습니다.');
      return false;
    }
  })
  // inputs.forEach((el)=>{
  //   if(el.value == null || el.value == '') blankFlag = true;
  //   formData.append(el.getAttribute('name'),el.value);
  // })
  
  // if(b)
}