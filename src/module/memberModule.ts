import {connect} from './index';
import { Member } from '../controller/user/Member';
import { ResultObject } from '../interface/ResultObject';

export const memberModel = {
  /**
   * 코드 중복 확인
   * @param code 
   * @returns 
   */
  codeExists : async (code:string)=>{
    const sql = `
      SELECT
        count(idx) as count
      FROM member
      WHERE code = ?
    `
    const arr = [code];
    let resultObj:ResultObject = await connect(sql,arr);
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
    const sql = `
      INSERT INTO member(
        code
        ,name
        ,email
        ,password
        ,address
        ,address_detail
        ,mobile_number
      )VALUES(?,?,?,?,?,?,?)
    `;
    const arr = [member.code,member.name,member.email,member.password,member.address,member.address_detail,member.mobile_number];
    const resultObj:ResultObject = await connect(sql,arr);
    return resultObj;
  },

  /**
   * 회원 조회
   * @param member 
   * @returns 
   */
  select : async (member:Member)=>{
    const sql = `
      SELECT
        idx 
        ,code
        ,email
        ,password
      FROM member
      WHERE email = ?
    `
    const arr = [member.email];
    const resultObj:ResultObject = await connect(sql,arr);
    return resultObj.data[0];
  },

  /**
   * 코드로 회원 조회
   * @param code 
   * @returns 
   */
  selectCode : async (code:string)=>{
    const sql = `
      SELECT
        idx
        ,code
        ,email
        ,password
        ,access_token
        ,refresh_token
      FROM member
      WHERE code = ?
    `
    const arr = [code];
    const resultObj:ResultObject = await connect(sql,arr);
    return resultObj.data[0];
  },

  /**
   * 토큰 업데이트
   * @param member 
   * @returns 
   */
  updateToken : async (member:Member)=>{
    const sql = `
      UPDATE member SET
        access_token = ?
        ,refresh_token = ?
      WHERE idx = ?
    `
    const arr = [member.access_token,member.refresh_token,member.idx];
    const resultObj:ResultObject = await connect(sql,arr);
    return resultObj;
  }
}