import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Member } from '../interface/Member';

dotenv.config();

const secretKey:string = process.env.JWT_SECRET_KEY as string;

export const JWTUtil = {
  /**
   * 회원 토큰 발행
   * @param payload 
   * @param time 
   * @returns 
   */
  createMemberToken : (member:Member , time:string) =>{
    let payload = {code : member.code}
    return jwt.sign(payload,secretKey,{expiresIn : time});
  },

  verifyMemberToken : (token:string) => {
    return jwt.verify(token,secretKey);
  }
}