import {connect} from './index';
import { Employee } from '../interface/Employee';
import mybatis from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';

export const EmployeeModel = {
  /**
   * 코드 중복 확인
   * @param code 
   * @returns 
   */
  exists : async (code:string)=>{
    const sql = mybatis.getStatement('employeeMapper','exists',{code:code});
    let resultObj:ResultObject = await connect(sql);
    return resultObj.data[0].count;
  },

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
  },

  /**
   * 직원 저장
   * @param employee 
   * @returns 
   */
  insert : async (employee:Employee)=>{
    const sql = mybatis.getStatement('employeeMapper','insert',employee);
    return await connect(sql) as ResultObject;
  },

  /**
   * 직원 리스트 출력
   * @param param 
   * @returns 
   */
  list : async (param:any)=>{
    const sql = mybatis.getStatement('employeeMapper','list',param);
    return await connect(sql) as ResultObject;
  },

  update : async (employee:Employee)=>{
    const sql = mybatis.getStatement('employeeMapper','update',employee);
    const resultObj:ResultObject = await connect(sql);
    return resultObj.result;
  }
}