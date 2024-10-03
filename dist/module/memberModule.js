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
exports.memberModel = void 0;
const index_1 = require("./index");
exports.memberModel = {
    codeExists: (code) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = `
      SELECT
        count(idx) as count
      FROM member
      WHERE code = ?
    `;
        const arr = [code];
        let resultObj = yield (0, index_1.connect)(sql, arr);
        if (!resultObj.result) {
            throw new Error(resultObj.errMessage || 'QUERY ERROR');
        }
        return resultObj.data[0].count;
    }),
    insert: (body) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = `
      INSERT INTO member(
        code
        ,name
        ,email
        ,password
        ,address
        ,address_detail
        ,mobile_number
      )VALUES(?,?,?,?,?,?,?)
    `;
        const arr = ['1'];
        const resultObj = yield (0, index_1.connect)(sql, arr);
        return resultObj;
    })
};
