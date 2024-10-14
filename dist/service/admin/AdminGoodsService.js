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
exports.AdminGoodsService = void 0;
const FileUtil_1 = require("../../util/FileUtil");
const FileModel_1 = require("../../models/FileModel");
const RandomUtil_1 = require("../../util/RandomUtil");
const GoodsModel_1 = require("../../models/GoodsModel");
exports.AdminGoodsService = {
    write: (req) => __awaiter(void 0, void 0, void 0, function* () {
        let goods = req.body;
        let existsFlag = false;
        while (existsFlag == false) {
            const randomCode = RandomUtil_1.RandomUtil.createRandomCode(13);
            if ((yield GoodsModel_1.GoodsModel.exists(randomCode)) == 0) {
                existsFlag = true;
                goods.code = randomCode;
            }
        }
        let resultObj = yield GoodsModel_1.GoodsModel.insert(goods);
        if (resultObj.result) {
            goods.idx = resultObj.data.insertId;
            let fileArr = req.files;
            /** 파일 업로드 */
            let fileIdxArr = [];
            if (fileArr instanceof Array && fileArr.length > 0) {
                for (let i = 0; i < fileArr.length; i++) {
                    let uploadResult = yield FileUtil_1.FileUtil.saveFile(fileArr[i], '/goods/' + resultObj.data.insertId);
                    if (uploadResult.result && uploadResult.data != null) {
                        fileIdxArr.push(yield FileModel_1.FileModel.insert(uploadResult.data));
                    }
                }
            }
            console.log(fileIdxArr);
            goods.file_idx = fileIdxArr.join('&^');
            yield GoodsModel_1.GoodsModel.update(goods);
        }
        return resultObj;
    })
};
