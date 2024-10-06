import {connect} from './index';
import { Member } from '../interface/Member';
import mybatisMapper from '../config/mybatisConfig';
import format from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';

export const MemberModel = {
  /**
   * 코드 중복 확인
   * @param code 
   * @returns 
   */
  codeExists : async (code:string)=>{
    const param = {code : code};
    const sql:string = mybatisMapper.getStatement("MemberMapper","exists",param);
    let resultObj:ResultObject = await connect(sql);
    if(!resultObj.result){
      throw new Error(resultObj.errMessage || 'QUERY ERROR');
    }
    return resultObj.data[0].count;
  },
  
  /**
   * 회원 insert
   * @param body 
   * @returns 
   */
  insert : async (member:Member)=>{
    const sql = mybatisMapper.getStatement('MemberMapper','insert',member);
    const resultObj:ResultObject = await connect(sql);
    return resultObj;
  },

  /**
   * 회원 조회
   * @param member 
   * @returns 
   */
  select : async (member:Member)=>{
    const sql = mybatisMapper.getStatement('MemberMapper','select',member);
    const resultObj:ResultObject = await connect(sql);
    return resultObj.data[0];
  },

  /**
   * 코드로 회원 조회
   * @param code 
   * @returns 
   */
  selectCode : async (code:string)=>{
    let param = {code : code};
    const sql = mybatisMapper.getStatement("MemberMapper",'select',param);
    const resultObj:ResultObject = await connect(sql);
    return resultObj.data[0];
  },

  /**
   * 토큰 업데이트
   * @param member 
   * @returns 
   */
  updateToken : async (member:Member)=>{
    const sql = mybatisMapper.getStatement('MemberMapper','update',member);
    const resultObj:ResultObject = await connect(sql);
    return resultObj;
  }
}