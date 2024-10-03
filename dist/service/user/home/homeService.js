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
exports.homeService = void 0;
const RandomUtil_1 = require("../../../util/RandomUtil");
const memberModule_1 = require("../../../module/memberModule");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
exports.homeService = {
    register: (req) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = { result: false };
        let body = req.body;
        // const keyArr = Object.keys(body);
        //
        // 이 코드에서 발생하는 문제는 body[keyArr[i]]에 접근할 때 발생하는 타입스크립트 오류입니다. 
        // body는 Member 타입을 따르고 있으며, Object.keys()로 얻은 keyArr의 값은 문자열 배열이므로, 
        // 타입스크립트가 이를 인덱스로 허용하지 않는 상황입니다.
        // 가장 안전한 방법은 keyof Member를 사용하여 타입스크립트가 키를 올바르게 인식하도록 만드는 것입니다.
        // 동적 속성 접근이 필요할 경우 인덱스 시그니처를 추가할 수 있지만, 이는 타입 안전성을 해칠 수 있습니다.
        // 루프 종료 조건도 수정해야 합니다.
        const keyArr = Object.keys(body);
        for (let i = 0; i < keyArr.length; i++) {
            if (body[keyArr[i]] == null || body[keyArr[i]] == '') {
                resultObj.result = false;
                resultObj.errMessage = '빈값이 존재합니다.';
                return resultObj;
            }
        }
        if (!emailRegex.test(body.email)) {
            resultObj.errMessage = "유효하지 않은 이메일 입니다.";
            return resultObj;
        }
        if (!phoneRegex.test(body.mobile_number)) {
            resultObj.errMessage = "유효하지 않은 휴대폰번호 입니다.";
            return resultObj;
        }
        let existsFlag = false;
        while (existsFlag == false) {
            const randomCode = RandomUtil_1.RandomUtil.createRandomCode(13);
            const count = yield memberModule_1.memberModel.codeExists(randomCode);
            if (count == 0) {
                existsFlag = true;
                body.code = randomCode;
            }
        }
        console.log(body.code);
        resultObj = yield memberModule_1.memberModel.insert(body);
        return resultObj;
    })
};
