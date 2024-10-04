"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomUtil = void 0;
exports.RandomUtil = {
    /**
     * 랜덤문자+숫자열 생성
     * @param {number} length 길이
     * @returns {string} 랜덤 코드
     */
    createRandomCode: (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            code += characters[randomIndex];
        }
        return code;
    }
};
