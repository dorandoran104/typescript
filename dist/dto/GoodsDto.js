"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsDto = void 0;
class GoodsDto {
    constructor(goodsBuilder) {
        this.idx = goodsBuilder.idx
            , this.code = goodsBuilder.code
            , this.name = goodsBuilder.name
            , this.total_price = goodsBuilder.total_price
            , this.file_idx = goodsBuilder.file_idx
            , this.path = goodsBuilder.path;
    }
    static get Builder() {
        return new GoodsBuilder();
    }
    toParams() {
        return {
            idx: this.idx,
            code: this.code,
            name: this.name,
            total_price: this.total_price,
            file_id: this.file_idx,
            path: this.path
        };
    }
}
exports.GoodsDto = GoodsDto;
class GoodsBuilder {
    setIdx(idx) {
        this.idx = idx;
        return this;
    }
    setCode(code) {
        this.code = code;
        return this;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setTotalPrice(total_price) {
        this.total_price = total_price;
        return this;
    }
    setFileIdx(file_idx) {
        this.file_idx = file_idx;
        return this;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    build() {
        return new GoodsDto(this);
    }
}
