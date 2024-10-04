import {connect} from './index';
import { Employee } from '../interface/Employee';
import mybatis from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';

export const EmployeeModel = {
  selectCode : async (code:string)=>{
   const sql = mybatis.getStatement('employeeMapper','select',{code : code});
   let resultObj:ResultObject = await connect(sql);
   return resultObj.data[0];
  }
}