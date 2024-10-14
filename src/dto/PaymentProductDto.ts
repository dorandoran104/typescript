export class PaymentProductDto{
  idx:number
  goods_idx:number
  payment_idx:number
  goods_name:string
  goods_price:number
  regist_date:string
  delete_yn:string

  constructor(paymentProduct:PaymentProductBuilder){
    this.idx = paymentProduct.idx;
    this.goods_idx = paymentProduct.goods_idx
    this.payment_idx = paymentProduct.payment_idx
    this.goods_name = paymentProduct.goods_name;
    this.goods_price = paymentProduct.goods_price;
    this.regist_date = paymentProduct.regist_date;
    this.delete_yn = paymentProduct.delete_yn;
  }

  toParams(){
    return{
      idx : this.idx
      ,goods_idx : this.goods_idx
      ,payment_idx : this.payment_idx
      ,goods_name : this.goods_name
      ,goods_price : this.goods_price
      ,regist_date : this.regist_date
      ,delete_yn : this.delete_yn
    }
  }

  static get Builder(){
    return new PaymentProductBuilder();
  }
}

class PaymentProductBuilder{
  idx!:number
  goods_idx!:number
  payment_idx!:number
  goods_name!:string
  goods_price!:number
  regist_date!:string
  delete_yn!:string

  setIdx(idx:number){
    this.idx = idx;
    return this;
  }

  setGoodsIdx(goods_idx:number){
    this.goods_idx = goods_idx;
    return this;
  }

  setPaymentIdx(payment_idx:number){
    this.payment_idx = payment_idx;
    return this;
  }

  setGoodsName(goods_name:string){
    this.goods_name = goods_name;
    return this;
  }

  setGoodsPrice(goods_price:number){
    this.goods_price = goods_price;
    return this;
  }

  setRegistDate(regist_date:string){
    this.regist_date = regist_date;
    return this;
  }

  setDeleteYn(delete_yn:string){
    this.delete_yn = delete_yn;
    return this;
  }

  build(){
    return new PaymentProductDto(this);
  }
}