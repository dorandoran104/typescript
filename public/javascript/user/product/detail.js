const payment_button = document.querySelector('.payment');

payment_button.onclick = async ()=>{
  const path = window.location.pathname;
  const parts = path.split('/');  
  const param = parts[parts.length - 1];

  let codeArr = [param];

  let data = await customFetch('/payment','post',{productArr : codeArr});
  if(data.promiseResult && data.result){
    const returnData = data.data;
    const response = await PortOne.requestPayment({
      storeId: returnData.store,
      channelKey: returnData.channel,
      paymentId: returnData.paymentId,
      orderName: returnData.goodsName,
      totalAmount: returnData.total_price,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer : {
        email : returnData.email,
        phoneNumber : returnData.mobile_number,
        fullName : returnData.customer_name
      }
    });
    console.log(response);

    data = await customFetch('/payment/verification','post',response);
    if(data.promiseResult && data.result){

    }
    if(!data.promiseResult || !data.result){
      if(data.errMessage != null && data.errMessage != ''){
        customAlert(data.errMessage);
        return false;
      }
      customAlert('결제가 실패하였습니다.\n 관리자에게 문의해 주세요');
      return false;
    }
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