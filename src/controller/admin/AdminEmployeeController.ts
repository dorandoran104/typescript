import { Request, Response } from "express"
import { ResultObject } from "../../interface/ResultObject";
import { AdminEmployeeService } from "../../service/admin/AdminEmployeeService";

export const AdminEmployeeController = {
  view : {
    list : async (req:Request,res:Response)=>{

      res.render('admin/employee/list')
    },
    write : async (req:Request, res:Response)=>{
      res.render('admin/employee/write');
    }
  },

  process : {
    write : async (req:Request, res:Response)=>{
      let resultObj:ResultObject = {result : false};
      try {
        resultObj = await AdminEmployeeService.write(req,res);
      } catch (error) {
        resultObj.result = false;
        resultObj.errMessage = '저장에 실패하였습니다.'
      } finally{
        res.json(resultObj);
      }
    }
  }
}