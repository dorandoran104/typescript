export class GoodsDto{
  idx!:number
  code!:string
  name!:string
  total_price!:number
  file_idx!: string
  path!: string

  constructor(goodsBuilder:GoodsBuilder){
    this.idx = goodsBuilder.idx
    ,this.code = goodsBuilder.code
    ,this.name = goodsBuilder.name
    ,this.total_price = goodsBuilder.total_price
    ,this.file_idx = goodsBuilder.file_idx
    ,this.path = goodsBuilder.path
  }

  static get Builder(){
    return new GoodsBuilder();
  }

  toParams():Record<string,any>{
    return{
      idx : this.idx
      ,code : this.code
      ,name : this.name
      ,total_price : this.total_price
      ,file_id : this.file_idx
      ,path : this.path
    }
  }
}

class GoodsBuilder{
  idx!:number
  code!:string
  name!:string
  total_price!:number
  file_idx!: string
  path!: string

  setIdx(idx:number){
    this.idx = idx
    return this
  }

  setCode(code:string){
    this.code = code;
    return this;
  }

  setName(name:string){
    this.name = name;
    return this;
  }

  setTotalPrice(total_price:number){
    this.total_price = total_price;
    return this;
  }

  setFileIdx(file_idx:string){
    this.file_idx = file_idx;
    return this;
  }

  setPath(path:string){
    this.path = path;
    return this;
  }

  build(){
    return new GoodsDto(this);
  }
}