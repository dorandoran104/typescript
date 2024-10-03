/**
 * 정규식
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

const dim = document.querySelector('.dim');

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

/**
 * 커스텀 얼럿
 * @param {Number} text 
 * @param {String} href
 */
function customSuccessAlert(text,href){
  const dangerAlert = document.querySelector('#custom_alert');
  dim.style.display = 'block'
  dangerAlert.querySelector('.modal-body p').innerText = text;
  dangerAlert.style.display = 'block'
  requestAnimationFrame(()=>{
    dim.style.display = 'none'
    dangerAlert.classList.add('show');
  })

  dangerAlert.querySelectorAll('.modal_close').forEach((el)=>{
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

  confirmAlert.querySelector('.modal-body p').innerText = text;
  confirmAlert.style.display = 'block';
  requestAnimationFrame(()=>{
    confirmAlert.classList.add('show');
  })

  const closeBtn = document.querySelectorAll('modal_close');
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