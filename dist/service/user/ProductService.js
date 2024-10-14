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
exports.ProductService = void 0;
const ProductModel_1 = require("../../models/ProductModel");
const FileModel_1 = require("../../models/FileModel");
const FileDto_1 = require("../../dto/FileDto");
const GoodsDto_1 = require("../../dto/GoodsDto");
exports.ProductService = {
    /**
     * 상품 리스트 출력
     * @param req
     * @returns
     */
    list: (req) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = yield ProductModel_1.ProductModel.list(req.params);
        for (let i = 0; i < resultObj.data.length; i++) {
            const file_idx = Number(resultObj.data[i].file_idx.split('&^')[0]);
            const fileDto = new FileDto_1.FileDto();
            fileDto.idx = file_idx;
            const ResultObject = yield FileModel_1.FileModel.select(fileDto);
            resultObj.data[i].path = ResultObject.path;
        }
        return resultObj.data;
    }),
    /**
     * 상품 상세
     * @param req
     * @returns
     */
    select: (req) => __awaiter(void 0, void 0, void 0, function* () {
        const code = req.params.code;
        let goodsDto = GoodsDto_1.GoodsDto.Builder
            .setCode(code)
            .build();
        goodsDto = yield ProductModel_1.ProductModel.select(goodsDto);
        if (goodsDto.file_idx != null && goodsDto.file_idx != '') {
            const file_idx = Number(goodsDto.file_idx.split('&^')[0]);
            let fileDto = new FileDto_1.FileDto();
            fileDto.idx = file_idx;
            fileDto = yield FileModel_1.FileModel.select(fileDto);
            goodsDto.path = fileDto.path;
        }
        return goodsDto;
    })
};
