export interface Employee {
  code : string
  ,email : string
  ,password : string
  ,access_token : string
  ,refresh_token : string
  ,birth_date : string
  ,mobile_number : string
  ,start_date : string
  ,end_date ?:string
  ,employee_status?:boolean
  ,[key : string] : any
}