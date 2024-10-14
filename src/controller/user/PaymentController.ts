import { Request, Response } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { PaymentService } from "../../service/user/PaymentService";

export const PaymentController = {
  process : {
    paymentInfo : async(req:Request,res:Response)=>{
      let resultObj:ResultObject = {result : false};
      try {
        resultObj = await PaymentService.paymentInfo(req);
      } catch (error) {
        console.error(error);
        resultObj.errMessage = '오류가 발생했습니다.';
      } finally {
        res.json(resultObj);
      }
    },

    verification : async(req:Request,res:Response)=>{
      let resultObj:ResultObject = {result:false};
      try {
        resultObj = await PaymentService.verification(req);
      } catch (error) {
        console.log(error);
        resultObj.errMessage = '오류가 발생했습니다.'
        /**
         *  에러발생시 환불 프로세스 시작
         */
      } finally {
        res.json(resultObj);
      }
    }
  }
}