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
exports.AdminHomeService = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = { result: false };
        let body = req.body;
        const employee = yield EmployeeModel_1.EmployeeModel.select(body);
        if (employee == null) {
            resultObj.errMessage = '아이디 혹은 비밀번호를 확인해 주세요';
            return resultObj;
        }
        return resultObj;
    })
};
