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
exports.ProductController = void 0;
const ProductService_1 = require("../../service/user/ProductService");
exports.ProductController = {
    view: {
        /**
         * 상품 리스트 출력
         * @param req
         * @param res
         */
        list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let productArr = yield ProductService_1.ProductService.list(req);
            res.render('user/product/list', { list: productArr });
        }),
        detail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            let product = yield ProductService_1.ProductService.select(req);
            res.render('user/product/detail', { detail: product });
        })
    },
};
