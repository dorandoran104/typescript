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
exports.AdminEmployeeController = void 0;
const AdminEmployeeService_1 = require("../../service/admin/AdminEmployeeService");
exports.AdminEmployeeController = {
    view: {
        /**
         * 직원 리스트
         * @param req
         * @param res
         */
        list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let resultObj = yield AdminEmployeeService_1.AdminEmployeeService.list(req);
            console.log(resultObj);
            res.render('admin/employee/list', resultObj);
        }),
        write: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            res.render('admin/employee/write');
        })
    },
    process: {
        write: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let resultObj = { result: false };
            try {
                resultObj = yield AdminEmployeeService_1.AdminEmployeeService.write(req, res);
            }
            catch (error) {
                console.error(error);
                resultObj.result = false;
                resultObj.errMessage = '저장에 실패하였습니다.';
            }
            finally {
                res.json(resultObj);
            }
        })
    }
};
