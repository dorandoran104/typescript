import { Request } from "express";
import { JWTUtil } from "../../util/JWTUtil";
import { MemberDto } from "../../dto/MemberDto";
import { ResultObject } from "../../interface/ResultObject";
import { JwtPayload } from "jsonwebtoken";
import { MemberModel } from "../../models/MemberModel";
import { GoodsDto } from "../../dto/GoodsDto";
import { GoodsModel } from "../../models/GoodsModel";
import { DateUtil } from "../../util/DateUtil";
import { PaymentDto } from "../../dto/PaymentDto";
import { PaymentModel } from "../../models/PaymentModel";
import { PaymentProductDto } from "../../dto/PaymentProductDto";

interface CustomJwtPayload extends JwtPayload {
  code: string;
}

export const PaymentService = {
  /**
   * 결제 등록
   * @param req 
   * @returns 
   */
  paymentInfo : async (req:Request)=>{
    const token = req.cookies.access_token;
    const decodeToken = JWTUtil.decodeToken(token) as CustomJwtPayload;

    let resultObj:ResultObject ={result :false};

    if(decodeToken == null){
      resultObj.errMessage = '로그인이 필요합니다.';
      return resultObj;
    }
    /**
     * 회원 확인
     */
    let memberDto:MemberDto = MemberDto.Builder
      .setCode(decodeToken.code)
      .build();

    const member = await MemberModel.select(memberDto);

    /**
     * 상품 확인
     */
    const productCodeArr = req.body.productArr;
    const productArr:GoodsDto[] = [];
    for(let i = 0; i<productCodeArr.length; i++){
      const productCode = productCodeArr[i];
      let goodsDto = GoodsDto.Builder
        .setCode(productCode)
        .build();
      const goods:GoodsDto = await GoodsModel.select(goodsDto);
      productArr.push(goods);
    }

    /**
     * 결제 insert
     */

    let goodsName = '';
    let totalPrice = 0;

    productArr.map((data:GoodsDto)=>{
      totalPrice+= data.total_price
      goodsName+= data.name+ ' '
    })

    console.log(totalPrice);

    let paymentNumber = DateUtil.getDateYYYYMMDD();

    let paymentDto = PaymentDto.Builder
      .setPaymentNumber(paymentNumber)
      .setMemberIdx(member.idx)
      .setTotalGoodsPrice(totalPrice)
      .setDeliveryFee(0)
      .setTotalPrice(totalPrice)
      .setDeleteYn('Y')
      .build();

    let paymentNumberCount = await PaymentModel.exists(paymentDto);
    console.log(paymentNumberCount);
    paymentNumber = paymentNumber+ String(paymentNumberCount+1).padStart(5,'0');
    paymentDto.payment_number = paymentNumber;

    resultObj = await PaymentModel.insert(paymentDto);
    if(resultObj.result){
      const paymentIdx = resultObj.data.insertId; 
      for(let i = 0; i<productArr.length ; i++){
        let goodsDto = productArr[i];
        let paymentProductDto = PaymentProductDto.Builder
          .setGoodsIdx(goodsDto.idx)
          .setGoodsName(goodsDto.name)
          .setGoodsPrice(goodsDto.total_price)
          .setPaymentIdx(paymentIdx)
          .setDeleteYn('Y')
          .build();
          await PaymentModel.insertPaymentProduct(paymentProductDto);
      }

      let data = {
        email : member.email
        ,mobile_number : member.mobile_number
        ,customer_name : member.name
        ,channel : process.env.PORTONE_CHANNELKEY
        ,store : process.env.PORTONE_STOREKEY
        ,goodsName : goodsName
        ,total_price : 1000
        ,paymentId : paymentDto.payment_number
      };
  
      resultObj.result = true;
      resultObj.data = data;
    }
    return resultObj;
  },

  verification : (req:Request):ResultObject=>{
    let resultObj = {result : false};

    const body = req.body;
    

    return resultObj;
  }
}