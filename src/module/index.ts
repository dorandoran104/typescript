import db from '../config/mysqlConfig';
import { ResultObject } from '../interface/ResultObject';

/**
 * 쿼리
 * @param sql 쿼리
 * @param paramArr 파라미터
 * @returns 
 */
export const connect = async (sql:string,paramArr:Array<any>)=>{
  let resultObj:ResultObject = {result : false};

  return new Promise<ResultObject>((resolve,reject)=>{
    console.log(sql);
    db.query(sql,paramArr,(err,data)=>{
      if(err){
        console.error(err.message);
        resultObj.result = false;
        resultObj.errMessage = err.message
        reject(resultObj);
      }
      if(!err){
        resultObj.result = true;
        resultObj.data = data;
        resolve(resultObj);
      }
    })
  })
}