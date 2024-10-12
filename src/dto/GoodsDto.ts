export class GoodsDto{
  idx!:number
  code!:string
  name!:string
  total_price!:number
  file_idx!: string
  path!: string

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