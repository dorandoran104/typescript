/**
 * 정규식
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

const dim = document.querySelector('.dim');

/**
 * customSelect
 */
const selects = document.querySelectorAll('.dropdown-btn');
selects.forEach((el)=>{
  el.addEventListener('click',()=>{
    const dropdown = el.nextElementSibling;
    dropdown.style.width = el.offsetWidth + 'px';
    dropdown.classList.toggle('show');

    dropdown.querySelectorAll('a').forEach((el1)=>{
      el1.addEventListener('click',()=>{
        el.innerText = el1.innerText;
        dropdown.classList.remove('show');
      })
    })
  })
})

// 드롭다운 외부를 클릭 시 모든 드롭다운을 닫음
window.addEventListener('click', (event) => {
  selects.forEach(el => {
    const dropdownContent = el.nextElementSibling;
    // 만약 클릭한 대상이 dropdown-btn 또는 dropdown-content 내부가 아니라면
    if (!el.contains(event.target) && !dropdownContent.contains(event.target)) {
      dropdownContent.classList.remove('show'); // 드롭다운 닫기
    }
  });
});
/**
 * customSelect
 */



/**
 * 커스텀 얼럿
 * @param {string} text 
 */
function customAlert(text){
  const dangerAlert = document.querySelector('#custom_alert');
  dim.style.display = 'block'
  dangerAlert.querySelector('.modal-body p').innerText = text;
  dangerAlert.style.display = 'block'
  requestAnimationFrame(()=>{
    dangerAlert.classList.add('show');
  })

  dangerAlert.querySelectorAll('.modal_close').forEach((el)=>{
    el.addEventListener('click',()=>{
      dim.style.display = 'none'
      el.closest('.modal').classList.remove('show');
      el.closest('.modal').style.display = 'none'
    })
  })
}


/**
 * 커스텀 얼럿(포커스용)
 * @param {string} text 
 * @param {Node} focus 
 */
function customAlert(text,focus){
  const dangerAlert = document.querySelector('#custom_alert');
  dim.style.display = 'block'
  dangerAlert.querySelector('.modal-body p').innerText = text;
  dangerAlert.style.display = 'block'
  requestAnimationFrame(()=>{
    dangerAlert.classList.add('show');
  })

  dangerAlert.querySelectorAll('.modal_close').forEach((el)=>{
    el.addEventListener('click',()=>{
      dim.style.display = 'none'
      if(focus != null && focus != '')
        focus.focus();
      el.closest('.modal').classList.remove('show');
      el.closest('.modal').style.display = 'none'
    })
  })
}

function customSelectAlert(text,target){
  console.log(target);
  const dangerAlert = document.querySelector('#custom_alert');
  dim.style.display = 'block';
  dangerAlert.querySelector('.modal-body p').innerText = text;
  dangerAlert.style.display = 'block';
  dangerAlert.classList.add = 'show';
  const closeBtn = dangerAlert.querySelectorAll('.modal_close');
  closeBtn.forEach((el)=>{
    el.onclick = ()=>{
      dim.style.display = 'none';
      dangerAlert.classList.remove('show');
      dangerAlert.style.display = 'none';
      target.previousElementSibling.click();
    }
  })
}

/**
 * 커스텀 얼럿
 * @param {Number} text 
 * @param {String} href
 */
function customSuccessAlert(text,href){
  const successAlert = document.querySelector('#custom_success_alert');
  dim.style.display = 'block'
  successAlert.querySelector('.modal-body p').innerText = text;
  successAlert.style.display = 'block'
  requestAnimationFrame(()=>{
    successAlert.classList.add('show');
  })

  successAlert.querySelectorAll('.modal_close').forEach((el)=>{
    el.addEventListener('click',()=>{
      dim.style.display = 'none'
      location.replace(href);
    })
  })
}



/**
 * 커스텀 컨펌
 * @param {String} text 
 * @param {Function} callback 
 */
function customConfirm(text,callback){
  const confirmAlert = document.querySelector('#custom_confirm');
  dim.style.display = 'block'
  confirmAlert.querySelector('.modal-body p').innerText = text;
  confirmAlert.style.display = 'block';
  requestAnimationFrame(()=>{
    confirmAlert.classList.add('show');
  })

  const closeBtn = document.querySelectorAll('.modal_close');
  closeBtn.forEach((el)=>{
    el.onclick = ()=>{
      closeModal();
    }
  })

  const confirmBtn = document.querySelector('.modal_confirm');
  confirmBtn.onclick = ()=>{
    if(callback instanceof Function){
      closeModal();
      callback();
    }
  }

  function closeModal(){
    dim.style.display = 'none';
    confirmAlert.classList.remove('show');
    confirmAlert.style.display = 'none';
  }
}

/**
 * fetch Post
 * @param {String} url 
 * @param {String} method 
 * @param {Object} param 
 */
async function customFetch(url,method,param){
  const returnData = await fetch(url,{
    method : method
    ,body : JSON.stringify(param)
    ,headers : {
      'content-type' : 'application/json'
    }
  })
  .then((res)=>res.json())
  .then((res)=>{
    res.promiseResult = true;
    return res;
  }).catch((err)=>{
    console.error(err)
    res.promiseResult = false;
    return res;
  })
  return returnData;
}