"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTMiddleware = void 0;
const JWTUtil_1 = require("../../util/JWTUtil");
const MemberModel_1 = require("../../models/MemberModel");
const EmployeeModel_1 = require("../../models/EmployeeModel");
exports.JWTMiddleware = {
    /**
     * 회원 토큰 확인
     * @param req
     * @param res
     * @param next
     * @returns
     */
    checkToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.cookies);
        const accessToken = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;
        if (accessToken == null || refreshToken == null) {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.redirect('/login');
            return;
        }
        const decodeToken = JWTUtil_1.JWTUtil.decodeToken(accessToken);
        let code = decodeToken.code;
        if (code == null || code == '') {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.redirect('/login');
            return;
        }
        const member = yield MemberModel_1.MemberModel.selectCode(code);
        if (member.access_token != accessToken || member.refresh_token != refreshToken) {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.redirect('/login');
            return;
        }
        try {
            JWTUtil_1.JWTUtil.verifyMemberToken(accessToken);
            next();
        }
        catch (error) {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            try {
                JWTUtil_1.JWTUtil.verifyMemberToken(refreshToken);
                const newAccessToken = JWTUtil_1.JWTUtil.createMemberToken(member, '1d');
                member.access_token = newAccessToken;
                console.error(error);
                console.error("");
                console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.error('@@@@@@@@ 토큰 재발행 @@@@@@@@@');
                console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.error("");
                if ((yield MemberModel_1.MemberModel.updateToken(member)).result) {
                    res.cookie('access_token', newAccessToken);
                    next();
                }
            }
            catch (error) {
                console.error(error);
                console.error("");
                console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@');
                console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.error("");
                res.clearCookie('access_token');
                res.clearCookie('refresh_token');
                res.redirect('/login');
                return;
            }
        }
    }),
    /**
     * 관리자 페이지 토큰 확인
     * @param req
     * @param res
     * @param next
     * @returns
     */
    checkAdminToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const path = req.path;
        if (path == '/login') {
            return next();
        }
        const accessToken = req.cookies.admin_access_token;
        const refreshToken = req.cookies.admin_refresh_token;
        console.error("");
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.error('@@@@@@@@ 토큰 검증 @@@@@@@@@');
        console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.error("");
        if (accessToken == null || refreshToken == '') {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            res.clearCookie('admin_access_token');
            res.clearCookie('admin_refresh_token');
            res.redirect('/admin/login');
            return;
        }
        const decodeToken = JWTUtil_1.JWTUtil.decodeToken(accessToken);
        let code = decodeToken.code;
        if (code == null || code == '') {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            res.clearCookie('admin_access_token');
            res.clearCookie('admin_refresh_token');
            res.redirect('/admin/login');
            return;
        }
        const employee = yield EmployeeModel_1.EmployeeModel.selectCode(code);
        if (employee == null) {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            res.clearCookie('admin_access_token');
            res.clearCookie('admin_refresh_token');
            res.redirect('/admin/login');
            return;
        }
        if (employee.access_token != accessToken || employee.refresh_token != refreshToken) {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 손상된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            res.clearCookie('admin_access_token');
            res.clearCookie('admin_refresh_token');
            res.redirect('/admin/login');
            return;
        }
        try {
            JWTUtil_1.JWTUtil.verifyAdminToken(accessToken);
            next();
        }
        catch (error) {
            console.error("");
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@');
            console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
            console.error("");
            try {
                JWTUtil_1.JWTUtil.verifyAdminToken(refreshToken);
                return next();
            }
            catch (error) {
                console.error("");
                console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.error('@@@@@@@@ 만료된 토큰 @@@@@@@@@');
                console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                console.error("");
                res.clearCookie('admin_access_token');
                res.clearCookie('admin_refresh_token');
                return;
            }
        }
    }),
};
