export class PaymentDto{
  idx : number
  member_idx : number
  payment_number : string
  payment_complete_yn : string
  total_goods_price : number
  total_price : number
  delivery_fee : number
  regist_date : string
  delete_yn : string

  constructor(payment:PaymentBuilder){
    this.idx = payment.idx
    this.member_idx = payment.member_idx
    this.payment_number = payment.payment_number
    this.payment_complete_yn = payment.payment_complete_yn
    this.total_goods_price = payment.total_goods_price
    this.total_price = payment.total_price
    this.delivery_fee = payment.delivery_fee
    this.regist_date = payment.regist_date
    this.delete_yn = payment.delete_yn
  }

  static get Builder(){
    return new PaymentBuilder();
  }

  toParams(){
    return{
      idx : this.idx
      ,member_idx : this.member_idx
      ,payment_number : this.payment_number
      ,payment_complete_yn : this.payment_complete_yn
      ,total_goods_price : this.total_goods_price
      ,total_price : this.total_price
      ,delivery_fee : this.delivery_fee
      ,regist_date : this.regist_date
      ,delete_yn : this.delete_yn
    }
  }
}

class PaymentBuilder{
  idx !: number
  member_idx !: number
  payment_number !: string
  payment_complete_yn !: string
  total_goods_price !: number
  total_price !: number
  delivery_fee !: number
  regist_date !: string
  delete_yn !: string

  setIdx(idx:number){
    this.idx = idx;
    return this
  }

  setMemberIdx(member_idx:number){
    this.member_idx = member_idx;
    return this;
  }

  setPaymentNumber(payment_number:string){
    this.payment_number = payment_number;
    return this;
  }

  setPaymentCompleteYn(payment_complete_yn:string){
    this.payment_complete_yn = payment_complete_yn;
    return this;
  }

  setTotalGoodsPrice(total_goods_price:number){
    this.total_goods_price = total_goods_price;
    return this;
  }

  setTotalPrice(total_price:number){
    this.total_price = total_price;
    return this;
  }

  setDeliveryFee(delivery_fee:number){
    this.delivery_fee = delivery_fee;
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
    return new PaymentDto(this);
  }
}