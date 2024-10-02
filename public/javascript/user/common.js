/**
 * 커스텀 얼럿
 * @param {Number} text 
 */
function customAlert(text){
  const dangerAlert = document.querySelector('#custom_alert');

  dangerAlert.querySelector('.modal-body p').innerText = text;
  dangerAlert.style.display = 'block'
  requestAnimationFrame(()=>{
    dangerAlert.classList.add('show');
  })

  dangerAlert.querySelectorAll('.modal_close').forEach((el)=>{
    el.addEventListener('click',()=>{
      el.closest('.modal').classList.remove('show');
      el.closest('.modal').style.display = 'none'
    })
  })
}


/**
 * 커스텀 얼럿(포커스용)
 * @param {Number} text 
 * @param {Node} focus 
 */
function customAlert(text,focus){
  const dangerAlert = document.querySelector('#custom_alert');

  dangerAlert.querySelector('.modal-body p').innerText = text;
  dangerAlert.style.display = 'block'
  requestAnimationFrame(()=>{
    dangerAlert.classList.add('show');
  })

  dangerAlert.querySelectorAll('.modal_close').forEach((el)=>{
    el.addEventListener('click',()=>{
      focus.focus();
      el.closest('.modal').classList.remove('show');
      el.closest('.modal').style.display = 'none'
    })
  })
}

/**
 * 커스텀 얼럿
 * @param {Number} text 
 */
function customSuccessAlert(text,href){
  const dangerAlert = document.querySelector('#custom_alert');

  dangerAlert.querySelector('.modal-body p').innerText = text;
  dangerAlert.style.display = 'block'
  requestAnimationFrame(()=>{
    dangerAlert.classList.add('show');
  })

  dangerAlert.querySelectorAll('.modal_close').forEach((el)=>{
    el.addEventListener('click',()=>{
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

  confirmAlert.querySelector('.modal-body p').innerText = text;
  confirmAlert.style.display = 'block';
  requestAnimationFrame(()=>{
    confirmAlert.classList.add('show');
  })

  confirmAlert.querySelectorAll('.modal_close').forEach((el)=>{
    el.addEventListener('click',()=>{
      closeModal();
    })
  })

  confirmAlert.querySelector('.modal_confirm').addEventListener('click',()=>{
    closeModal();
    callback();
  })

  function closeModal(){
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