"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDto = void 0;
class FileDto {
    toParams() {
        return {
            idx: this.idx,
            path: this.path,
            save_name: this.save_name,
            original_name: this.original_name,
            size: this.size,
            regist_date: this.regist_date
        };
    }
}
exports.FileDto = FileDto;
