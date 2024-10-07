import { Request,  Response } from "express";
import { Employee } from "../../interface/Employee";
import { ResultObject } from "../../interface/ResultObject";
import { EmployeeModel } from "../../models/EmployeeModel";
import { BcryptUtil } from "../../util/BcryptUtil";
import { JWTUtil } from "../../util/JWTUtil";

export const AdminHomeService = {
  login : async (req:Request,res:Response)=>{
    let resultObj:ResultObject = {result :false};
    let body:Employee = req.body;
    
    const employee:Employee = await EmployeeModel.select(body);
    console.log(employee)
    if(employee == null){
      resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
      return resultObj;
    }

    const compare = await BcryptUtil.compareBcrypt(body.password,employee.password);
    console.log(compare)
    if(!compare){
      resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
      return resultObj;
    }

    if(compare){
      resultObj.result = compare;
      employee.access_token = JWTUtil.createAdminToken(employee,'1h');
      employee.refresh_token = JWTUtil.createAdminToken(employee,'5d');
      if(await EmployeeModel.update(employee)){
        res.cookie('admin_access_token',employee.access_token);
        res.cookie('admin_refresh_token',employee.refresh_token);
      }
    }

    return resultObj;
  }
}