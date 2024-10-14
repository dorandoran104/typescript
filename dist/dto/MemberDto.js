"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberDto = void 0;
class MemberDto {
    constructor(builder) {
        this.idx = builder.idx;
        this.code = builder.code;
        this.name = builder.name;
        this.mobile_number = builder.mobile_number;
        this.email = builder.email;
        this.password = builder.password;
        this.address = builder.address;
        this.address_detail = builder.address_detail;
        this.access_token = builder.access_token;
        this.refresh_token = builder.refresh_token;
    }
    toParams() {
        return {
            idx: this.idx,
            code: this.code,
            name: this.name,
            mobile_number: this.mobile_number,
            email: this.email,
            password: this.password,
            address: this.address,
            address_detail: this.address_detail,
            access_token: this.access_token,
            refresh_token: this.refresh_token,
        };
    }
    // static Builder method
    static get Builder() {
        return new MemberBuilder();
    }
}
exports.MemberDto = MemberDto;
// 빌더 클래스
class MemberBuilder {
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
    setMobileNumber(mobile_number) {
        this.mobile_number = mobile_number;
        return this;
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    setPassword(password) {
        this.password = password;
        return this;
    }
    setAddress(address) {
        this.address = address;
        return this;
    }
    setAddressDetail(address_detail) {
        this.address_detail = address_detail;
        return this;
    }
    setAccessToken(access_token) {
        this.access_token = access_token;
        return this;
    }
    setRefreshToken(refresh_token) {
        this.refresh_token = refresh_token;
        return this;
    }
    build() {
        return new MemberDto(this);
    }
}
