login_btn.addEventListener('click',async ()=>{
  const email = exampleInputEmail1.value;
  const password = exampleInputPassword1.value;

  if(email == null || email == ''){
    customAlert('이메일을 입력해 주세요',exampleInputEmail1);
    return false;
  }

  if(password == null || password == ''){
    customAlert('비밀번호를 입력해 주세요',exampleInputPassword1);
  }
  
  customConfirm('저장하시겠습니까?',async ()=>{
    let param = {};
    param.email = email;
    param.password = password;
    let result = await customFetch('/login','post',param)
    if(result.promiseResult){
      location.replace('/');
    }
    else{
      if(result.errMessage){
        customAlert(result.errMessage);
      }else{
        customAlert('저장에 실패하였습니다.')
      }

    }
  })
})