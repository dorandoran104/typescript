import { Request, Response } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { Employee } from "../../interface/Employee";
import { RandomUtil } from "../../util/RandomUtil";
import { EmployeeModel } from "../../models/EmployeeModel";
import { BcryptUtil } from "../../util/BcryptUtil";

const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const phone_reg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

export const AdminEmployeeService = {
  write : async (req:Request,res:Response)=>{
    let resultObj:ResultObject = {result :false};
    let employee:Employee = req.body;

    let keyArr = Object.keys(employee) as Array<keyof Employee>
    for(let i = 0; i<keyArr.length ; i++){
      if(employee[keyArr[i]] == null || employee[keyArr[i]] == ''){
        resultObj.errMessage = '빈 값이 존재합니다.';
        return resultObj;
      }
    }

    if(!email_reg.test(employee.email)){
      resultObj.errMessage = '유효하지 않은 이메일입니다.';
      return resultObj;
    }

    if(!date_reg.test(employee.birth_date)){
      resultObj.errMessage = '유효하지 않은 날짜입니다.';
      return resultObj;
    }

    if(!phone_reg.test(employee.mobile_number)){
      resultObj.errMessage = '유효하지 않은 휴대폰번호입니다.';
      return resultObj;
    }

    let existsFlag = false;
    while(existsFlag == false){
      const randomCode = RandomUtil.createRandomCode(13);
      const count:number = await EmployeeModel.exists(randomCode);
      if(count == 0){
        existsFlag = true;
        employee.code = randomCode;
      }
    }

    const encode = BcryptUtil.createBcrypt(employee.password);
    employee.password = encode;

    resultObj = await EmployeeModel.insert(employee);

    return resultObj;
  }
}