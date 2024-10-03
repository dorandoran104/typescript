import { Request, Response } from "express"
import { homeService } from "../../../service/user/home/homeService";
import { ResultObject } from "../../../interface/ResultObject";


/**
 * 뷰 처리 컨트롤러
 */
export const view = {
  /**
   * 메인화면
   * @param req 
   * @param res 
   */
  home : async (req:Request,res:Response)=>{
    res.render('user/home/home')
  },

  /**
   * 로그인 화면
   * @param req 
   * @param res 
   */
  login : async (req:Request,res:Response)=>{
    res.render('user/home/login')
  },

  /**
   * 회원가입 화면
   * @param req 
   * @param res 
   */
  register : async (req:Request,res:Response)=>{
    res.render('user/home/register');
  }
}

export const process = {
  login : async (req:Request, res:Response)=>{
    
  },
  register : async (req:Request, res:Response)=>{
    let resultObj:ResultObject = {result : false};
    try {
      resultObj = await homeService.register(req);
    } catch (error) {
      resultObj.result = false;
      resultObj.errMessage = error instanceof Error ? error.message : String(error);
    }finally{
      res.send(resultObj);
    }
  }
}




