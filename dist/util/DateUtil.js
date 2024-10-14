"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
exports.DateUtil = {
    getDateYYYYMMDD: () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return year + String(month).padStart(2, '0') + String(day).padStart(2, '0');
    }
};
