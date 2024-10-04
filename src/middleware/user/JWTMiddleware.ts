import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWTUtil } from '../../util/JWTUtil';
import { Member } from '../../interface/Member';
import { memberModel } from '../../models/memberModel';
import { EmployeeModel} from '../../models/employeeModel';

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

    const member:Member = await memberModel.selectCode(code);
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
        if((await memberModel.updateToken(member)).result){
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

  checkAdminToken : async (req:Request, res:Response , next:NextFunction)=>{
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

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

    // const employee = await EmployeeModel.
  }
}