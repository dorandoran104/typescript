import { Request, Response } from "express"
import { ResultObject } from "../../interface/ResultObject";

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
        
      } catch (error) {
        
      } finally{
        res.json(resultObj);
      }
    }
  }
}