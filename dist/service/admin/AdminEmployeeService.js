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
exports.AdminEmployeeService = void 0;
const RandomUtil_1 = require("../../util/RandomUtil");
const EmployeeModel_1 = require("../../models/EmployeeModel");
const BcryptUtil_1 = require("../../util/BcryptUtil");
const email_reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const date_reg = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const phone_reg = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
exports.AdminEmployeeService = {
    write: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = { result: false };
        let employee = req.body;
        let keyArr = Object.keys(employee);
        for (let i = 0; i < keyArr.length; i++) {
            if (employee[keyArr[i]] == null || employee[keyArr[i]] == '') {
                resultObj.errMessage = '빈 값이 존재합니다.';
                return resultObj;
            }
        }
        if (!email_reg.test(employee.email)) {
            resultObj.errMessage = '유효하지 않은 이메일입니다.';
            return resultObj;
        }
        if (!date_reg.test(employee.birth_date)) {
            resultObj.errMessage = '유효하지 않은 날짜입니다.';
            return resultObj;
        }
        if (!phone_reg.test(employee.mobile_number)) {
            resultObj.errMessage = '유효하지 않은 휴대폰번호입니다.';
            return resultObj;
        }
        let existsFlag = false;
        while (existsFlag == false) {
            const randomCode = RandomUtil_1.RandomUtil.createRandomCode(13);
            const count = yield EmployeeModel_1.EmployeeModel.exists(randomCode);
            if (count == 0) {
                existsFlag = true;
                employee.code = randomCode;
            }
        }
        const encode = BcryptUtil_1.BcryptUtil.createBcrypt(employee.password);
        employee.password = encode;
        resultObj = yield EmployeeModel_1.EmployeeModel.insert(employee);
        return resultObj;
    }),
    list: (req) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = yield EmployeeModel_1.EmployeeModel.list(req.body);
        resultObj.data.map((data) => {
            if (data.end_date == null || data.end_date == '') {
                data.employee_status = false;
            }
            if (data.end_date != null && data.end_date != '') {
                let today = new Date();
                today.setHours(0, 0, 0, 0);
                let endDate = new Date(data.end_date);
                endDate.setHours(0, 0, 0, 0);
                data.employee_status = today >= endDate;
            }
        });
        return resultObj;
    })
};
