import { Request, Response } from "express"
import { homeService } from "../../service/user/homeService";
import { ResultObject } from "../../interface/ResultObject";


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

/**
 * API
 */
export const process = {
  /**
   * 로그인
   * @param req 
   * @param res 
   */
  login : async (req:Request, res:Response)=>{
    let resultObj:ResultObject = {result : false};
    try {
      resultObj = await homeService.login(req,res);
    } catch (error) {
      console.log(error);
      resultObj.result = false;
      resultObj.errMessage = error instanceof Error ? error.message : String(error);
    } finally{
      res.send(resultObj);
    }
    
  },
  /**
   * 회원가입
   * @param req 
   * @param res 
   */
  register : async (req:Request, res:Response)=>{
    let resultObj:ResultObject = {result : false};
    try {
      resultObj = await homeService.register(req);
    } catch (error) {
      console.log(error);
      resultObj.result = false;
      resultObj.errMessage = error instanceof Error ? error.message : String(error);
    }finally{
      res.send(resultObj);
    }
  }
}




