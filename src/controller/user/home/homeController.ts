import { Request, Response } from "express"

export const home = async (req:Request,res:Response)=>{
  res.render('user/home/home')
}

export const login = async (req:Request,res:Response)=>{
  res.render('user/home/login')
}

export const register = async (req:Request,res:Response)=>{
  res.render('user/home/register')
}



