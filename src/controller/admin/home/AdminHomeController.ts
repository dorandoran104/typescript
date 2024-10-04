import { Request, Response } from "express";

export const AdminHomeController = {
  view : {
    home : async (req:Request,res:Response)=>{
      res.render('admin/home/home')
    },
    login : async (req:Request, res:Response)=>{
      res.render('admin/home/login')
    }
  }
}