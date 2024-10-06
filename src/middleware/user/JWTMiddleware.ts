import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWTUtil } from '../../util/JWTUtil';
import { Member } from '../../interface/Member';
import { MemberModel } from '../../models/MemberModel';
import { EmployeeModel} from '../../models/EmployeeModel';
import { Employee } from '../../interface/Employee';

export const JWTMiddleware = {
  /**
   * 회원 토큰 확인
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  checkToken : async (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.cookies)
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;
    if(accessToken == null || refreshToken == null){
      console.error("")
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@')
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error("")
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.redirect('/login')
      return;
    }
    const decodeToken = JWTUtil.decodeToken(accessToken);
    let code = (decodeToken as JwtPayload).code as string;
    if(code == null || code == ''){
      console.error("")
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@')
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error("")
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.redirect('/login')
      return;
    }

    const member:Member = await MemberModel.selectCode(code);
    if(member.access_token != accessToken || member.refresh_token != refreshToken){
      console.error("")
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@')
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error("")
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.redirect('/login')
      return
    }

    try {
      JWTUtil.verifyMemberToken(accessToken);
      next();
    } catch (error) {
      console.error("")
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@')
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error("")
      try {
        JWTUtil.verifyMemberToken(refreshToken);
        const newAccessToken = JWTUtil.createMemberToken(member,'1d');
        member.access_token = newAccessToken;
        if((await MemberModel.updateToken(member)).result){
          res.cookie('access_token',newAccessToken);
          next();
        }
      } catch (error) {
        console.error(error);
        console.error("")
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@')
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error("")
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.redirect('/login')
        return;
      }
    }
  },

  /**
   * 관리자 페이지 토큰 확인
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  checkAdminToken : async (req:Request, res:Response , next:NextFunction)=>{
    const accessToken = req.cookies.a_access_token;
    const refreshToken = req.cookies.a_refresh_token;

    const decodeToken = JWTUtil.decodeToken(accessToken);
    let code = (decodeToken as JwtPayload).code as string;
    if(code == null || code == ''){
      console.error("")
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@')
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error("")
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.redirect('/admin/login')
      return;
    }

    const employee:Employee = await EmployeeModel.selectCode(code);
    if(employee == null){
      console.error("")
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@')
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error("")
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.redirect('/admin/login')
      return;
    }
    if(employee.access_token != accessToken || employee.refresh_token != refreshToken){
      console.error("")
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@')
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error("")
      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
      res.redirect('/admin/login')
      return;
    }

    try {
      JWTUtil.verifyAdminToken(accessToken);
      next();
    } catch (error) {
      console.error("")
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@')
      console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
      console.error("")
      try {
        JWTUtil.verifyAdminToken(refreshToken);
        next();
      } catch (error) {
        console.error("")
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@')
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        console.error("")
        res.clearCookie('a_access_token');
        res.clearCookie('a_refresh_token');
        return;
      }
    }
  },

}