const first_category = document.querySelector('.section .first_category')
const second_category = document.querySelector('.section .second_category');

first_category.querySelectorAll('a').forEach((el)=>{
  el.onclick = ()=>{
    selectValue(first_category,el);
    const first_category_input = document.querySelector('input[name="first_category_input"]');
    const second_category_input = document.querySelector('input[name="second_category_input"]');
    first_category_input.disabled = el.getAttribute('data-value') != 'a'
    second_category_input.disabled = el.getAttribute('data-value') != 'a'
  }
})

second_category.querySelectorAll('a').forEach((el)=>{
  el.onclick = ()=>{
    selectValue(second_category,el);
    const second_category_input = document.querySelector('input[name="second_category_input"]');
    second_category_input.disabled = el.getAttribute('data-value') != 'a'
  }
})

function selectValue(el,target){
  const selectBtn = el.previousElementSibling;
  selectBtn.setAttribute('data-value',target.getAttribute('data-value'));
}

document.querySelector('.write_btn').onclick = ()=>{
  let param = {};
  const first_category_value = first_category.previousElementSibling.getAttribute('data-value');
  const first_category_input = document.querySelector('input[name="first_category_input"]');
  
  const second_category_value = second_category.previousElementSibling.getAttribute('data-value');
  const second_category_input = document.querySelector('input[name="second_category_input"]');
  if(first_category_value == null || first_category_value == ''){
    customSelectAlert('1차 카테고리를 선택해 주세요',first_category);
    return false;
  }

  if(first_category_value === 'a' && (first_category_input.value == null || first_category_input.value == '')){
    customAlert('1차 카테고리를 입력해 주세요',first_category_input);
    return false;
  }

  // if(second_category_value == null || second_category_value == ''){
  //   customSelectAlert('2차 카테고리를 선택해 주세요',second_category);
  //   return false;
  // }

  if(second_category_value === 'a' && (second_category_input.value == null || second_category_input.value == '')){
    customAlert('2차 카테고리를 입력해 주세요',second_category_input);
    return false;
  }

  customConfirm('저장하시겠습니까?',async ()=>{
    param.first_category_idx = first_category_value;
    param.first_category_input= first_category_input.value;
    param.second_category_idx = second_category_value;
    param.second_category_input = second_category_input.value;

    let data = await customFetch('/admin/category/write','post',param);
    if(data.promiseResult && data.result){
      customSuccessAlert('저장되었습니다.','/admin/category');
    }
    if(!data.promiseResult || !data.result){
      if(data.errMessage != null && data.errMessage != ''){
        customAlert(data.errMessage);
        return false;
      }
      customAlert('저장에 실패하였습니다.');
      return false;
    }
  })
}