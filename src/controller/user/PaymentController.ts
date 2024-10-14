import { Request, Response } from "express";
import { ResultObject } from "../../interface/ResultObject";

export const PaymentController = {
  process : {
    paymentInfo : async(req:Request,res:Response)=>{
      let resultObj:ResultObject = {result : false};
      try {
        
      } catch (error) {
        resultObj.errMessage = '오류가 발생했습니다.';
      } finally {
        res.json(resultObj);
      }
    }
  }
}