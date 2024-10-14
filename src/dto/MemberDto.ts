export class MemberDto {
  idx!: number;
  code!: string;
  name!: string;
  mobile_number!: string;
  email!: string;
  password!: string;
  address!: string;
  address_detail!: string;
  access_token!: string;
  refresh_token!: string;

  constructor(builder: MemberBuilder) {
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

  toParams():Record<string,any> {
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

// 빌더 클래스
class MemberBuilder {
  idx!: number;
  code!: string;
  name!: string;
  mobile_number!: string;
  email!: string;
  password!: string;
  address!: string;
  address_detail!: string;
  access_token!: string;
  refresh_token!: string;

  setIdx(idx: number): MemberBuilder {
    this.idx = idx;
    return this;
  }

  setCode(code: string): MemberBuilder {
    this.code = code;
    return this;
  }

  setName(name: string): MemberBuilder {
    this.name = name;
    return this;
  }

  setMobileNumber(mobile_number: string): MemberBuilder {
    this.mobile_number = mobile_number;
    return this;
  }

  setEmail(email: string): MemberBuilder {
    this.email = email;
    return this;
  }

  setPassword(password: string): MemberBuilder {
    this.password = password;
    return this;
  }

  setAddress(address: string): MemberBuilder {
    this.address = address;
    return this;
  }

  setAddressDetail(address_detail: string): MemberBuilder {
    this.address_detail = address_detail;
    return this;
  }

  setAccessToken(access_token: string): MemberBuilder {
    this.access_token = access_token;
    return this;
  }

  setRefreshToken(refresh_token: string): MemberBuilder {
    this.refresh_token = refresh_token;
    return this;
  }

  build(): MemberDto {
    return new MemberDto(this);
  }
}
