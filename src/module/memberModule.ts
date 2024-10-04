import {connect} from './index';
import { Member } from '../interface/Member';
import { ResultObject } from '../interface/ResultObject';

export const memberModel = {
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
  }
  ,insert : async (body:Member)=>{
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
    const arr = [body.code,body.name,body.email,body.password,body.address,body.address_detail,body.mobile_number];
    const resultObj:ResultObject = await connect(sql,arr);
    return resultObj;
  },
  select : async (body:Member)=>{
    const sql = `
      SELECT
        email
        ,password
      FROM member
      WHERE email = ?
    `
    const arr = [body.email];
    const resultObj:ResultObject = await connect(sql,arr);

    return resultObj.data[0];
  }
}