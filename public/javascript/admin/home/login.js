const login_btn = document.querySelector('.login_btn');

document.querySelectorAll('input').forEach((el)=>{
  el.onkeyup = (e)=>{
    if(e.keyCode == 13) login();
  }
})

login_btn.onclick = ()=>{
  login();
}

async function login(){
  const email = document.querySelector('input[name="email"]');
  const password = document.querySelector('input[name="password"]');

  if(email.value == null || email.value == ''){
    customAlert('이메일을 입력해 주세요');
    return false;
  }

  if(password.value == null || password.value == ''){
    customAlert('비밀번호를 입력해 주세요');
    return false;
  }

  let param = {};
  param.email = email.value;
  param.password = password.value;
  
  let data = await customFetch('/admin/login','post',param)

}