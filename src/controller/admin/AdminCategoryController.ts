import { Request, Response } from "express";

export const AdminCategoryController = {
  view : {
    /**
     * 카테고리 리스트 페이지
     * @param req 
     * @param res 
     */
    list : async (req:Request,res:Response)=>{
      res.render('admin/category/list');
    },

    /**
     * 카테고리 작성 페이지
     * @param req 
     * @param res 
     */
    write : async (req:Request,res:Response)=>{
      res.render('admin/category/write');
    }
  },

  process : {

  }
}