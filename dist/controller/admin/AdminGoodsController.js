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
exports.AdminGoodsController = void 0;
const AdminGoodsService_1 = require("../../service/admin/AdminGoodsService");
const AdminCategoryService_1 = require("../../service/admin/AdminCategoryService");
exports.AdminGoodsController = {
    view: {
        /**
         * 상품 리스트
         * @param req
         * @param res
         */
        list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            res.render('admin/goods/list');
        }),
        /**
         * 상품 등록 페이지
         * @param req
         * @param res
         */
        write: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let resultObj = { result: true };
            const categoryList = yield AdminCategoryService_1.AdminCategoryService.getCategoryList(1);
            resultObj.data = categoryList;
            res.render('admin/goods/write', resultObj);
        })
    },
    process: {
        write: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let resultObj = { result: false };
            try {
                resultObj = yield AdminGoodsService_1.AdminGoodsService.write(req);
            }
            catch (error) {
                resultObj.result = false;
                resultObj.errMessage = '저장에 실패하였습니다.';
            }
            finally {
                res.json(resultObj);
            }
        })
    }
};
