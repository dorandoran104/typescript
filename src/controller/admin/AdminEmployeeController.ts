import { Request, Response } from "express"
import { ResultObject } from "../../interface/ResultObject";
import { AdminEmployeeService } from "../../service/admin/AdminEmployeeService";

export const AdminEmployeeController = {
  view : {
    /**
     * 직원 리스트
     * @param req 
     * @param res 
     */
    list : async (req:Request,res:Response)=>{
      let resultObj:ResultObject = await AdminEmployeeService.list(req);
      console.log(resultObj);
      res.render('admin/employee/list',resultObj);
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
        console.error(error);
        resultObj.result = false;
        resultObj.errMessage = '저장에 실패하였습니다.'
      } finally{
        res.json(resultObj);
      }
    }
  }
}