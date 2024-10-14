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
exports.PaymentController = void 0;
const PaymentService_1 = require("../../service/user/PaymentService");
exports.PaymentController = {
    process: {
        paymentInfo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let resultObj = { result: false };
            try {
                resultObj = yield PaymentService_1.PaymentService.paymentInfo(req);
            }
            catch (error) {
                console.error(error);
                resultObj.errMessage = '오류가 발생했습니다.';
            }
            finally {
                res.json(resultObj);
            }
        }),
        verification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let resultObj = { result: false };
            try {
                resultObj = yield PaymentService_1.PaymentService.verification(req);
            }
            catch (error) {
                console.log(error);
                resultObj.errMessage = '오류가 발생했습니다.';
                /**
                 *  에러발생시 환불 프로세스 시작
                 */
            }
            finally {
                res.json(resultObj);
            }
        })
    }
};
