const form = document.querySelector('.regist_form');

form.querySelectorAll('input').forEach((el)=>{
  el.setAttribute('autocomplete','off');
})

/** 핸드폰번호 유효성*/
const mobile_number_input = form.querySelector('input[name="mobile_number"]');
mobile_number_input.oninput = (e)=>{
    e.target.setAttribute('maxlength',13);
    let value = e.target.value;
    value = e.target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    e.target.value = value;
}
mobile_number_input.onblur = (e)=>{
  const value = e.target.value;
  if(value.length > 0 && !phoneRegex.test(value)){
    customAlert('유효하지 않은 휴대폰번호입니다.',e.target);
    return false;
  }
}

const email_input = form.querySelector('input[name="email"]');
email_input.onblur = (e)=>{
  const value = e.target.value;
  if(value.length > 0 && !emailRegex.test(value)){
    customAlert('유효하지 않은 이메일입니다.',e.target);
    return false;
  }
}

document.querySelector('input[name="address"]').addEventListener('click',(e)=>{
  new daum.Postcode({
    oncomplete: function(data) {
        console.log(data);
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        e.target.value = data.address;
        document.querySelector('input[name="address_detail"]').focus();
        }
    }).open( {popupKey: 'popup1'});
})

function save(){
  let param = {};
  const inputs = form.querySelectorAll('input');

  for(let i = 0; i<inputs.length ; i++){
    const input = inputs[i];
    if(input.value == null || input.value == ''){
      customAlert('빈 항목이 존재합니다.',input);
      return false;
    }
    param[input.getAttribute('name')] = input.value;
  }

  if(!emailRegex.test(param.email)){
    customAlert('유효하지 않은 이메일 입니다.',form.querySelector('input[name="email"]'));
    return false;
  }
  if(!phoneRegex.test(param.mobile_number)){
    customAlert('유효하지 않은 휴대폰번호입니다.',form.querySelector('input[name="mobile_number"]'));
    return false;
  }
  if(param.password != param.check_password){
    customAlert('비밀번호가 일치하지 않습니다.',form.querySelector('input[name="password"]'));
    return false;
  }
  customConfirm('저장하시겠습니까?',async ()=>{
    let data = await customFetch('/register','post',param);
    if(data.promiseResult && data.result){
      customSuccessAlert('저장되었습니다.','/login');
      // customLocationAlert('저장되었습니다.','/login')
      // location.href = '/login'
    }else{
      if(data.errMessage != null && data.errMessage != ''){
        customAlert(data.errMessage);
        return false;
      }
      customAlert('저장에 실패하였습니다.');
      return false;
    }
  })
}