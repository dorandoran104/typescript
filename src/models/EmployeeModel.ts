import {connect} from './index';
import { Employee } from '../interface/Employee';
import mybatis from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';

export const EmployeeModel = {
  /**
   * 코드로 직원 조회
   * @param code 
   * @returns 
   */
  selectCode : async (code:string)=>{
   const sql = mybatis.getStatement('employeeMapper','select',{code : code});
   let resultObj:ResultObject = await connect(sql);
   return resultObj.data[0];
  },
  
  /**
   * 직원 조회
   * @param employee 
   * @returns 
   */
  select : async (employee:Employee)=>{
    const sql = mybatis.getStatement('employeeMapper','select',employee);
    let resultObj:ResultObject = await connect(sql);
    return resultObj.data[0];
  }
}