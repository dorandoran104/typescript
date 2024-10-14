"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
const mybatis_mapper_1 = __importDefault(require("mybatis-mapper"));
const path_1 = __importDefault(require("path"));
mybatis_mapper_1.default.createMapper([
    path_1.default.join(__dirname, '../../mapper/EmployeeMapper.xml'),
    path_1.default.join(__dirname, '../../mapper/MemberMapper.xml'),
    path_1.default.join(__dirname, '../../mapper/CategoryMapper.xml'),
    path_1.default.join(__dirname, '../../mapper/FileMapper.xml'),
    path_1.default.join(__dirname, '../../mapper/GoodsMapper.xml'),
    path_1.default.join(__dirname, '../../mapper/PaymentMapper.xml')
]);
exports.format = { language: 'sql', indent: '  ' };
exports.default = mybatis_mapper_1.default;
