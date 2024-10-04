const login_btn = document.querySelector('#login_btn');
const inputs = document.querySelectorAll('input');

login_btn.onclick = ()=>{
  login();
}

inputs.forEach((el)=>{
  el.onkeyup = (e) =>{
    console.log(e.keyCode)
    if(e.keyCode == 13){
      login();
    }
  }
})

async function login(){
  const email = document.querySelector('input[type="email"]');
  const password = document.querySelector('input[type="password"]');

  if(email.value == ''){
    customAlert('이메일을 입력해주세요',email);
    return false;
  }
  if(password.value == ''){
    customAlert('비밀번호를 입력해주세요',password);
    return false;
  }

  let param = {};
  param.email = email.value;
  param.password = password.value;

  let data = await customFetch('/login','post',param);
  if(data.promiseResult && data.result){
    location.replace('/');
  }
  else{
    if(data.errMessage != null && data.errMessage != ''){
      customAlert(data.errMessage);
      return false;
    }
    customAlert('로그인에 실패하였습니다.');
    return false;
  }
}