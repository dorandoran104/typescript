import { Request, Response } from "express"

export const login = async (req:Request,res:Response)=>{
  console.log('sssss')
  res.json({
    result : false
  })
}