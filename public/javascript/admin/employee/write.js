const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const phone_reg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

let button = document.querySelector("button.write_btn");

button.onclick = ()=>{
  const form = document.querySelector("form.row.g-3.needs-validation");
  const inputs = form.querySelectorAll('input');

  let param = {};
  for(let i = 0; i<inputs.length; i++){
      const input = inputs[i];
      if(input.value == null || input.value == ''){
          customAlert('빈값이 존재합니다.',input);
          return false;
      }
      param[input.getAttribute('name')] = input.value;
  }

  if(!email_reg.test(param.email)){
    customAlert('유효하지 않은 이메일입니다.',form.querySelector('input[name="email"]'));
    return false;
  }

  if(!date_reg.test(param.birth_date)){
    customAlert('유효하지 않은 날짜입니다.',form.querySelector('input[name="birth_date"]'));
    return false;
  }

  if(!phone_reg.test(param.mobile_number)){
    customAlert('유효하지 않은 휴대폰번호입니다.',form.querySelector('input[name="mobile_number"]'));
    return false;
  }
  
  customConfirm('저장하시겠습니까?',async ()=>{
    const data = await customFetch('/admin/employee/write','post',param);
    if(data.promiseResult && data.result){
      customSuccessAlert('저장되었습니다.','/admin/employee')
    }
    if(!data.promiseResult || !data.result){
      if(data.errMessage != null && data.errMessage != ''){
        customAlert(data.errMessage);
        return false;
      }
      customAlert('저장에 실패하였습니다');
      return false;
    }
  })
}

const emailInput = document.querySelector('input[name="email"]');
emailInput.onblur = ()=>{
  if(emailInput.value.length > 0 && !email_reg.test(emailInput.value)){
    customAlert('유효하지 않은 이메일 입니다.',emailInput);
    return false;
  }
}

const birthDateInput = document.querySelector('input[name="birth_date"]');
birthDateInput.onblur = ()=>{
  if(birthDateInput.value.length > 0 && !date_reg.test(birthDateInput.value)){
    customAlert('유효하지 않은 날짜입니다.',birthDateInput);
    return false;
  }
}
birthDateInput.oninput = ()=>{
  let value = birthDateInput.value;
  value = value.replace(/\D/g, '');
  if (value.length > 4) {
  value = value.slice(0, 4) + '-' + value.slice(4);
  }
  if (value.length > 7) {
  value = value.slice(0, 7) + '-' + value.slice(7, 9);
  }
  birthDateInput.value = value;
}

const mobileNumberInput = document.querySelector('input[name="mobile_number"]');
mobileNumberInput.onblur = ()=>{
  if(mobileNumberInput.value.length > 0 && !phone_reg.test(mobileNumberInput.value)){
    customAlert('유효하지 않은 휴대폰번호입니다.',mobileNumberInput);
    return false;
  }
}
mobileNumberInput.oninput = ()=>{
  mobileNumberInput.setAttribute('maxlength',13);
  let value = mobileNumberInput.value;
  value = value.replace(/[^0-9]/g, '')
  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
  mobileNumberInput.value = value;
}

// document.querySelector('input[name="birth_date"]').addEventListener('blur',(e)=>{
//     if(e.target.value.length > 0 && !date_reg.test(e.target.value)){
//         alert('유효하지 않은 날짜 형식 입니다.');
//         return false;
//     }
// })

// document.querySelector('input[name="mobile_number"]').addEventListener('input',(e)=>{
//     console.log('ss')
//     e.target.setAttribute('maxlength',13);
//     let value = e.target.value;
//     value = e.target.value
//     .replace(/[^0-9]/g, '')
//     .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
//     e.target.value = value;
// })

// document.querySelector('input[name="mobile_number"]').addEventListener('blur',(e)=>{
//     if(e.target.value.length > 0 && !phone_reg.test(e.target.value)){
//         alert('유효하지 않은 핸드폰번호 입니다.');
//         return false;
//     }
// })