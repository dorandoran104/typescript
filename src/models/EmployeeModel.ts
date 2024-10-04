import {connect} from './index';
import { Employee } from '../interface/Employee';
import mybatis from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';

export const EmployeeModel = {
  select : async (employee:Employee)=>{
   const sql = mybatis.getStatement('employeeMapper','select',employee);
   let resultObj:ResultObject = await connect(sql);
   return resultObj.data[0];
  }
}