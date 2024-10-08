"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptUtil = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = bcrypt_1.default.genSaltSync(10);
exports.BcryptUtil = {
    createBcrypt: (password) => {
        return bcrypt_1.default.hashSync(password, salt);
    },
    compareBcrypt: (password, encodePassword) => {
        return bcrypt_1.default.compare(password, encodePassword);
    }
};
