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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberModel = void 0;
const index_1 = require("./index");
const mybatisConfig_1 = __importDefault(require("../config/mybatisConfig"));
exports.MemberModel = {
    /**
     * 코드 중복 확인
     * @param code
     * @returns
     */
    codeExists: (code) => __awaiter(void 0, void 0, void 0, function* () {
        const param = { code: code };
        const sql = mybatisConfig_1.default.getStatement("MemberMapper", "exists", param);
        let resultObj = yield (0, index_1.connect)(sql);
        if (!resultObj.result) {
            throw new Error(resultObj.errMessage || 'QUERY ERROR');
        }
        return resultObj.data[0].count;
    }),
    /**
     * 회원 insert
     * @param body
     * @returns
     */
    insert: (member) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = mybatisConfig_1.default.getStatement('MemberMapper', 'insert', member);
        const resultObj = yield (0, index_1.connect)(sql);
        return resultObj;
    }),
    /**
     * 회원 조회
     * @param member
     * @returns
     */
    select: (member) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = mybatisConfig_1.default.getStatement('MemberMapper', 'select', member);
        const resultObj = yield (0, index_1.connect)(sql);
        return resultObj.data[0];
    }),
    /**
     * 코드로 회원 조회
     * @param code
     * @returns
     */
    selectCode: (code) => __awaiter(void 0, void 0, void 0, function* () {
        let param = { code: code };
        const sql = mybatisConfig_1.default.getStatement("MemberMapper", 'select', param);
        const resultObj = yield (0, index_1.connect)(sql);
        return resultObj.data[0];
    }),
    /**
     * 토큰 업데이트
     * @param member
     * @returns
     */
    updateToken: (member) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = mybatisConfig_1.default.getStatement('MemberMapper', 'update', member);
        const resultObj = yield (0, index_1.connect)(sql);
        return resultObj;
    })
};
