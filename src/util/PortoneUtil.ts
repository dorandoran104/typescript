import { ResultObject } from "../interface/ResultObject";
import fetch from "node-fetch";

const portoneUrl = process.env.PORTONE_URL as string;
const loginUrl = process.env.PORTONE_LOGIN_URL as string;
const secretKey = process.env.PORTONE_SECRETKEY as string;

export const PortOneUtil = {
  
  /**
   * 토큰 발행
   * @returns 
   */
  getToken : async ()=>{
    let resultObj:ResultObject = {result:false};
    const url = portoneUrl + loginUrl;
    const body = {
      apiSecret : secretKey
    }
    const returnData = await connectPost(url,body);

    return resultObj;
  },

  getPayment : ():ResultObject=>{
    let resultObj = {result :false};

    return resultObj;
  }
}

const connectGet = async (url:string)=>{
  let response = await fetch(url,{

  })
}

const connectPost= async(url:string,body:object)=>{
  let response = await fetch(url,{
    method : 'post'
    ,body : JSON.stringify(body)
  })

  await response.json();
  return response;
}