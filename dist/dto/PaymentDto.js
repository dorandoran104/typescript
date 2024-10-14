"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDto = void 0;
class PaymentDto {
    constructor(payment) {
        this.idx = payment.idx;
        this.member_idx = payment.member_idx;
        this.payment_number = payment.payment_number;
        this.payment_complete_yn = payment.payment_complete_yn;
        this.total_goods_price = payment.total_goods_price;
        this.total_price = payment.total_price;
        this.delivery_fee = payment.delivery_fee;
        this.regist_date = payment.regist_date;
        this.delete_yn = payment.delete_yn;
    }
    static get Builder() {
        return new PaymentBuilder();
    }
    toParams() {
        return {
            idx: this.idx,
            member_idx: this.member_idx,
            payment_number: this.payment_number,
            payment_complete_yn: this.payment_complete_yn,
            total_goods_price: this.total_goods_price,
            total_price: this.total_price,
            delivery_fee: this.delivery_fee,
            regist_date: this.regist_date,
            delete_yn: this.delete_yn
        };
    }
}
exports.PaymentDto = PaymentDto;
class PaymentBuilder {
    setIdx(idx) {
        this.idx = idx;
        return this;
    }
    setMemberIdx(member_idx) {
        this.member_idx = member_idx;
        return this;
    }
    setPaymentNumber(payment_number) {
        this.payment_number = payment_number;
        return this;
    }
    setPaymentCompleteYn(payment_complete_yn) {
        this.payment_complete_yn = payment_complete_yn;
        return this;
    }
    setTotalGoodsPrice(total_goods_price) {
        this.total_goods_price = total_goods_price;
        return this;
    }
    setTotalPrice(total_price) {
        this.total_price = total_price;
        return this;
    }
    setDeliveryFee(delivery_fee) {
        this.delivery_fee = delivery_fee;
        return this;
    }
    setRegistDate(regist_date) {
        this.regist_date = regist_date;
        return this;
    }
    setDeleteYn(delete_yn) {
        this.delete_yn = delete_yn;
        return this;
    }
    build() {
        return new PaymentDto(this);
    }
}
