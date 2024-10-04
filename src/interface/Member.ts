export interface Member {
  idx : number
  ,code : string
  ,name : string
  ,mobile_number : string
  ,email : string
  ,password : string
  ,address : string
  ,address_detail : string
  ,access_token ?: string
  ,refresh_token ?: string
  ,[key:string] : any;
}