import { Request, Response } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { AdminHomeService } from "../../service/admin/home/AdminHomeService";

export const AdminHomeController = {
  view : {
    home : async (req:Request,res:Response)=>{
      res.render('admin/home/home')
    },
    login : async (req:Request, res:Response)=>{
      res.render('admin/home/login')
    }
  },

  process : {
    login : async (req:Request, res:Response)=>{
      let resultObj:ResultObject = {result : false};
      try {
        resultObj = await AdminHomeService.login(req,res);
      } catch (error) {
        resultObj.result = false;
        // resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
      } finally{
        res.send(resultObj);
      }
    }  
  }
}