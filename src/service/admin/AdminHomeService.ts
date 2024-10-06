import { Request,  Response } from "express";
import { Employee } from "../../interface/Employee";
import { ResultObject } from "../../interface/ResultObject";
import { EmployeeModel } from "../../models/EmployeeModel";

export const AdminHomeService = {
  login : async (req:Request,res:Response)=>{
    let resultObj:ResultObject = {result :false};
    let body:Employee = req.body;
    
    const employee:Employee = await EmployeeModel.select(body);
    if(employee == null){
      resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
      return resultObj;
    }

    return resultObj;
  }
}