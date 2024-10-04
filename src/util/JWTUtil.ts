import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Member } from '../interface/Member';
import { Employee } from '../interface/Employee';

dotenv.config();

const secretKey:string = process.env.JWT_MEMBER_SECRET_KEY as string;
const adminSecretKey:string = process.env.JWT_ADMIN_SECRET_KEY as string;

export const JWTUtil = {
  /**
   * 회원 토큰 발행
   * @param payload 
   * @param time 
   * @returns 
   */
  createMemberToken : (member:Member , time:string) =>{
    const payload = {code : member.code, email : member.email}
    return jwt.sign(payload,secretKey,{expiresIn : time});
  },

  /**
   * 회원 토큰 확인
   * @param token 
   * @returns 
   */
  verifyMemberToken : (token:string) => {
    return jwt.verify(token,secretKey);
  },

  /**
   * 토큰 디코딩
   * @param token 
   * @returns 
   */
  decodeToken : (token:string) => {
    return jwt.decode(token);
  },

  /**
   * 관리자 토큰 생성
   * @param employee 
   * @param time 
   * @returns 
   */
  createAdminToken : (employee:Employee, time:string)=>{
    const payload = {code : employee.code, email : employee.email};
    return jwt.sign(payload,adminSecretKey,{expiresIn : time});
  },

  /**
   * 관리자 토큰 확인
   * @param token 
   * @returns 
   */
  verifyAdminToken : (token:string)=>{
    return jwt.verify(token,adminSecretKey);
  }
}