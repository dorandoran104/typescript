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
exports.AdminCategoryService = void 0;
const CategoryModel_1 = require("../../models/CategoryModel");
exports.AdminCategoryService = {
    /**
     * 카테고리 insert
     * @param req
     * @returns
     */
    write: (req) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = { result: false };
        let { first_category_idx, first_category_input, second_category_idx, second_category_input } = req.body;
        if (first_category_idx === 'a') {
            let category = {
                name: first_category_input,
                depth: 1
            };
            resultObj = yield CategoryModel_1.CategoryModel.insert(category);
            if (!resultObj.result) {
                throw new Error('저장에 실패하였습니다.');
            }
            first_category_idx = resultObj.data.insertId;
            let relationshipParam = {
                ancestor_idx: first_category_idx,
                descendant_idx: first_category_idx
            };
            resultObj = yield CategoryModel_1.CategoryModel.insertAncestor(relationshipParam);
            if (!resultObj.result) {
                throw new Error('저장에 실패하였습니다.');
            }
        }
        let category = {
            name: second_category_input,
            depth: 2
        };
        resultObj = yield CategoryModel_1.CategoryModel.insert(category);
        if (!resultObj.result) {
            throw new Error('저장에 실패하였습니다.');
        }
        let relationshipParam = {
            ancestor_idx: first_category_idx,
            descendant_idx: resultObj.data.insertId
        };
        resultObj = yield CategoryModel_1.CategoryModel.insertAncestor(relationshipParam);
        return resultObj;
    }),
    /**
     * 카테고리 뎁스 리스트
     * @param depth
     */
    getCategoryList: (depth) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = yield CategoryModel_1.CategoryModel.depthList(depth);
        const categoryList = resultObj.data;
        return categoryList;
    }),
    getDescendantList: (ancestor_idx) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = yield CategoryModel_1.CategoryModel.getDescendantList(ancestor_idx);
        return resultObj;
    })
};
