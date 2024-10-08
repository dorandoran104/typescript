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
exports.process = exports.view = void 0;
const homeService_1 = require("../../../service/user/home/homeService");
/**
 * 뷰 처리 컨트롤러
 */
exports.view = {
    /**
     * 메인화면
     * @param req
     * @param res
     */
    home: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.render('user/home/home');
    }),
    /**
     * 로그인 화면
     * @param req
     * @param res
     */
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.render('user/home/login');
    }),
    /**
     * 회원가입 화면
     * @param req
     * @param res
     */
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.render('user/home/register');
    })
};
/**
 * API
 */
exports.process = {
    /**
     * 로그인
     * @param req
     * @param res
     */
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = { result: false };
        try {
            resultObj = yield homeService_1.homeService.login(req, res);
        }
        catch (error) {
            console.log(error);
            resultObj.result = false;
            resultObj.errMessage = error instanceof Error ? error.message : String(error);
        }
        finally {
            res.send(resultObj);
        }
    }),
    /**
     * 회원가입
     * @param req
     * @param res
     */
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = { result: false };
        try {
            resultObj = yield homeService_1.homeService.register(req);
        }
        catch (error) {
            console.log(error);
            resultObj.result = false;
            resultObj.errMessage = error instanceof Error ? error.message : String(error);
        }
        finally {
            res.send(resultObj);
        }
    })
};
