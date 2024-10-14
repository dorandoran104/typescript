import { Request } from "express";
import { JWTUtil } from "../../util/JWTUtil";
import { MemberDto } from "../../dto/MemberDto";
import { ResultObject } from "../../interface/ResultObject";
import { JwtPayload } from "jsonwebtoken";
import { MemberModel } from "../../models/MemberModel";
import { GoodsDto } from "../../dto/GoodsDto";
import { GoodsModel } from "../../models/GoodsModel";

interface CustomJwtPayload extends JwtPayload {
  code: string;
}

export const PaymentService = {
  paymentInfo : async (req:Request)=>{
    const token = req.cookies.accsss_token;
    const decodeToken = JWTUtil.decodeToken(token) as CustomJwtPayload;

    let resultObj:ResultObject ={result :false};

    if(decodeToken == null){
      resultObj.errMessage = '로그인이 필요합니다.';
      return resultObj;
    }
    /**
     * 회원 확인
     */
    let member:MemberDto = MemberDto.Builder
      .setCode(decodeToken.code)
      .build();

    member = await MemberModel.select(member);

    /**
     * 상품 확인
     */
    let goods = GoodsDto.Builder
      .setCode(req.body.code)
      .build();

    goods = await GoodsModel.select(goods);

    let data = {
      email : member.email
      ,mobile_number : member.mobile_number
      ,chennel : process.env.PORTONE_CHANNELKEY
      ,store : process.env.PORTONE_STOREKEY
      ,goodsName : goods.name
      ,total_price : goods.total_price
      // ,goodsName : 
    };
    
    return resultObj;
  }
}