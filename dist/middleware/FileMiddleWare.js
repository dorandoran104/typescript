"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileMiddleWare = void 0;
const multer_1 = __importDefault(require("multer"));
// 메모리 저장소 설정
const storage = multer_1.default.memoryStorage();
// multer 미들웨어 설정 (메모리 저장소 사용)
exports.FileMiddleWare = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // 파일명이 UTF-8로 인코딩되었는지 확인
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, true);
    }
});
