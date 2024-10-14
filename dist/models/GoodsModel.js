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
exports.GoodsModel = void 0;
const index_1 = require("./index");
const mybatisConfig_1 = __importDefault(require("../config/mybatisConfig"));
exports.GoodsModel = {
    exists: (code) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = mybatisConfig_1.default.getStatement('GoodsMapper', 'exists', { code: code });
        return (yield (0, index_1.connect)(sql)).data[0].count;
    }),
    insert: (goods) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = mybatisConfig_1.default.getStatement('GoodsMapper', 'insert', goods);
        return (yield (0, index_1.connect)(sql));
    }),
    update: (goods) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = mybatisConfig_1.default.getStatement('GoodsMapper', 'update', goods);
        return yield (0, index_1.connect)(sql);
    }),
    select: (goods) => __awaiter(void 0, void 0, void 0, function* () {
        const sql = mybatisConfig_1.default.getStatement('GoodsMapper', 'select', goods.toParams());
        return (yield (0, index_1.connect)(sql)).data[0];
    })
};
