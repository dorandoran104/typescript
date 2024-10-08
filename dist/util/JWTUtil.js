"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTUtil = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secretKey = process.env.JWT_MEMBER_SECRET_KEY;
const adminSecretKey = process.env.JWT_ADMIN_SECRET_KEY;
exports.JWTUtil = {
    /**
     * 회원 토큰 발행
     * @param payload
     * @param time
     * @returns
     */
    createMemberToken: (member, time) => {
        const payload = { code: member.code, email: member.email };
        return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: time });
    },
    /**
     * 회원 토큰 확인
     * @param token
     * @returns
     */
    verifyMemberToken: (token) => {
        return jsonwebtoken_1.default.verify(token, secretKey);
    },
    /**
     * 토큰 디코딩
     * @param token
     * @returns
     */
    decodeToken: (token) => {
        return jsonwebtoken_1.default.decode(token);
    },
    /**
     * 관리자 토큰 생성
     * @param employee
     * @param time
     * @returns
     */
    createAdminToken: (employee, time) => {
        const payload = { code: employee.code, email: employee.email };
        return jsonwebtoken_1.default.sign(payload, adminSecretKey, { expiresIn: time });
    },
    /**
     * 관리자 토큰 확인
     * @param token
     * @returns
     */
    verifyAdminToken: (token) => {
        return jsonwebtoken_1.default.verify(token, adminSecretKey);
    }
};
