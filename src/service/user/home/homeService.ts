import { Request,Response } from "express";
import { Member } from "../../../interface/Member";
import { RandomUtil } from '../../../util/RandomUtil';
import { memberModel } from "../../../models/memberModel";
import { ResultObject } from "../../../interface/ResultObject";
import { BcryptUtil } from "../../../util/BcryptUtil";
import { JWTUtil } from "../../../util/JWTUtil";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

export const homeService = {
  /**
   * 회원가입
   * @param req 
   * @returns 
   */
  register : async (req:Request) => {
    
    let resultObj:ResultObject = {result :false};
    let body:Member = req.body;

    // const keyArr = Object.keys(body);
    //
    // 이 코드에서 발생하는 문제는 body[keyArr[i]]에 접근할 때 발생하는 타입스크립트 오류입니다. 
    // body는 Member 타입을 따르고 있으며, Object.keys()로 얻은 keyArr의 값은 문자열 배열이므로, 
    // 타입스크립트가 이를 인덱스로 허용하지 않는 상황입니다.

    // 가장 안전한 방법은 keyof Member를 사용하여 타입스크립트가 키를 올바르게 인식하도록 만드는 것입니다.
    // 동적 속성 접근이 필요할 경우 인덱스 시그니처를 추가할 수 있지만, 이는 타입 안전성을 해칠 수 있습니다.
    // 루프 종료 조건도 수정해야 합니다.

    const keyArr = Object.keys(body) as Array<keyof Member>;
    for(let i = 0 ; i < keyArr.length ; i++){
      if(body[keyArr[i]] == null || body[keyArr[i]] == ''){
        resultObj.result = false;
        resultObj.errMessage = '빈값이 존재합니다.';
        return resultObj;
      }
    }

    if(!emailRegex.test(body.email)){
      resultObj.errMessage = "유효하지 않은 이메일 입니다.";
      return resultObj;
    }

    if(!phoneRegex.test(body.mobile_number)){
      resultObj.errMessage = "유효하지 않은 휴대폰번호 입니다.";
      return resultObj;
    }

    let existsFlag = false;
    
    while(existsFlag == false){
      const randomCode = RandomUtil.createRandomCode(13);
      const count = await memberModel.codeExists(randomCode);
      if(count == 0){
        existsFlag = true;
        body.code = randomCode;
      }
    }

    const encode = BcryptUtil.createBcrypt(body.password);
    body.password = encode;
    console.log(body.code);
    resultObj = await memberModel.insert(body);
    return resultObj;
  },
  /**
   * 로그인
   * @param req 
   * @returns 
   */
  login : async (req:Request,res:Response)=>{
    let resultObj:ResultObject = {result : false};
    const body:Member = req.body;
    const member:Member = await memberModel.select(body);
    if(member == null){
      resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
      return resultObj;
    }

    const comparePassword = await BcryptUtil.compareBcrypt(body.password,member.password);
    if(!comparePassword){
      resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
      return resultObj;
    }
    resultObj.result = comparePassword;
    if(resultObj.result){
      //jwt토큰 생성
      const access_token = JWTUtil.createMemberToken(member,'1h');
      const refresh_token = JWTUtil.createMemberToken(member,'5d');
      member.access_token = access_token;
      member.refresh_token = refresh_token;
      if((await memberModel.updateToken(member)).result){
        res.cookie('access_token',access_token);
        res.cookie('refresh_token',refresh_token);
      }
    }
    return resultObj;
  }

  
}