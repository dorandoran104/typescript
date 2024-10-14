const payment_button = document.querySelector('.payment');

payment_button.onclick = async ()=>{
  const path = window.location.pathname;
  const parts = path.split('/');  
  const param = parts[parts.length - 1];

  let data = await customFetch('/payment','post',{code : param});
  if(data.promiseResult && data.result){
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: "store-297882d7-b2b2-4a9c-b6c2-6853f113a43e",
      // 채널 키 설정
      channelKey: "channel-key-4b7d2b79-7f9b-4579-9661-5a3393f45728",
      paymentId: `payment-123123123}`,
      orderName: "나이키 와플 트레이너 2 SD",
      totalAmount: 1000,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer : {
        email : 'pgh_96@naver.com',
        phoneNumber : '010-4447-0922',
        fullName : '박건희'
      }
    });
  }
  if(!data.promiseResult || !data.result){
    if(data.errMessage != null && data.errMessage != ''){
      customAlert(data.errMessage);
      return false;
    }

    customAlert('오류가 발생했습니다.');
    return false;
  }

  
}