"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const JWTUtil_1 = require("../../util/JWTUtil");
const MemberDto_1 = require("../../dto/MemberDto");
const MemberModel_1 = require("../../models/MemberModel");
const GoodsDto_1 = require("../../dto/GoodsDto");
const GoodsModel_1 = require("../../models/GoodsModel");
const DateUtil_1 = require("../../util/DateUtil");
const PaymentDto_1 = require("../../dto/PaymentDto");
const PaymentModel_1 = require("../../models/PaymentModel");
const PaymentProductDto_1 = require("../../dto/PaymentProductDto");
exports.PaymentService = {
    /**
     * 결제 등록
     * @param req
     * @returns
     */
    paymentInfo: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.access_token;
        const decodeToken = JWTUtil_1.JWTUtil.decodeToken(token);
        let resultObj = { result: false };
        if (decodeToken == null) {
            resultObj.errMessage = '로그인이 필요합니다.';
            return resultObj;
        }
        /**
         * 회원 확인
         */
        let memberDto = MemberDto_1.MemberDto.Builder
            .setCode(decodeToken.code)
            .build();
        const member = yield MemberModel_1.MemberModel.select(memberDto);
        /**
         * 상품 확인
         */
        const productCodeArr = req.body.productArr;
        const productArr = [];
        for (let i = 0; i < productCodeArr.length; i++) {
            const productCode = productCodeArr[i];
            let goodsDto = GoodsDto_1.GoodsDto.Builder
                .setCode(productCode)
                .build();
            const goods = yield GoodsModel_1.GoodsModel.select(goodsDto);
            productArr.push(goods);
        }
        /**
         * 결제 insert
         */
        let goodsName = '';
        let totalPrice = 0;
        productArr.map((data) => {
            totalPrice += data.total_price;
            goodsName += data.name + ' ';
        });
        console.log(totalPrice);
        let paymentNumber = DateUtil_1.DateUtil.getDateYYYYMMDD();
        let paymentDto = PaymentDto_1.PaymentDto.Builder
            .setPaymentNumber(paymentNumber)
            .setMemberIdx(member.idx)
            .setTotalGoodsPrice(totalPrice)
            .setDeliveryFee(0)
            .setTotalPrice(totalPrice)
            .setDeleteYn('Y')
            .build();
        let paymentNumberCount = yield PaymentModel_1.PaymentModel.exists(paymentDto);
        console.log(paymentNumberCount);
        paymentNumber = paymentNumber + String(paymentNumberCount + 1).padStart(5, '0');
        paymentDto.payment_number = paymentNumber;
        resultObj = yield PaymentModel_1.PaymentModel.insert(paymentDto);
        if (resultObj.result) {
            const paymentIdx = resultObj.data.insertId;
            for (let i = 0; i < productArr.length; i++) {
                let goodsDto = productArr[i];
                let paymentProductDto = PaymentProductDto_1.PaymentProductDto.Builder
                    .setGoodsIdx(goodsDto.idx)
                    .setGoodsName(goodsDto.name)
                    .setGoodsPrice(goodsDto.total_price)
                    .setPaymentIdx(paymentIdx)
                    .setDeleteYn('Y')
                    .build();
                yield PaymentModel_1.PaymentModel.insertPaymentProduct(paymentProductDto);
            }
            let data = {
                email: member.email,
                mobile_number: member.mobile_number,
                customer_name: member.name,
                channel: process.env.PORTONE_CHANNELKEY,
                store: process.env.PORTONE_STOREKEY,
                goodsName: goodsName,
                total_price: 1000,
                paymentId: paymentDto.payment_number
            };
            resultObj.result = true;
            resultObj.data = data;
        }
        return resultObj;
    }),
    verification: (req) => {
        let resultObj = { result: false };
        return resultObj;
    }
};
