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
exports.AdminHomeService = void 0;
const EmployeeModel_1 = require("../../models/EmployeeModel");
const BcryptUtil_1 = require("../../util/BcryptUtil");
const JWTUtil_1 = require("../../util/JWTUtil");
exports.AdminHomeService = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = { result: false };
        let body = req.body;
        const employee = yield EmployeeModel_1.EmployeeModel.select(body);
        console.log(employee);
        if (employee == null) {
            resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
            return resultObj;
        }
        const compare = yield BcryptUtil_1.BcryptUtil.compareBcrypt(body.password, employee.password);
        console.log(compare);
        if (!compare) {
            resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
            return resultObj;
        }
        if (compare) {
            resultObj.result = compare;
            employee.access_token = JWTUtil_1.JWTUtil.createAdminToken(employee, '1h');
            employee.refresh_token = JWTUtil_1.JWTUtil.createAdminToken(employee, '5d');
            if (yield EmployeeModel_1.EmployeeModel.update(employee)) {
                res.cookie('admin_access_token', employee.access_token);
                res.cookie('admin_refresh_token', employee.refresh_token);
            }
        }
        return resultObj;
    })
};
