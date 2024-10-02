const form = document.querySelector('.regist_form');

form.querySelectorAll('input').forEach((el)=>{
  el.setAttribute('autocomplete','off');
})

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

document.querySelector('.regist_btn').addEventListener('click',()=>{
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
    customAlert('유효하지 않은 이메일 입니다.');
    return false;
  }
  if(param.password != param.check_password){
    customAlert('비밀번호가 일치하지 않습니다.',form.querySelector('input[name="password"]'));
    return false;
  }
})