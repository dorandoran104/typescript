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
exports.connect = void 0;
const mysqlConfig_1 = __importDefault(require("../config/mysqlConfig"));
/**
 * 쿼리
 * @param sql 쿼리
 * @param paramArr 파라미터
 * @returns
 */
const connect = (sql) => __awaiter(void 0, void 0, void 0, function* () {
    let resultObj = { result: false };
    return new Promise((resolve, reject) => {
        console.log(sql);
        mysqlConfig_1.default.query(sql, (err, data) => {
            if (err) {
                console.error(err.message);
                resultObj.result = false;
                resultObj.errMessage = err.message;
                reject(resultObj);
            }
            if (!err) {
                resultObj.result = true;
                resultObj.data = data;
                resolve(resultObj);
            }
        });
    });
});
exports.connect = connect;
