import { Request, Response } from "express";
import { Goods } from "../../interface/Goods";
import { ProductService } from "../../service/user/ProductService";

export const ProductController = {
  view : {
    list : async (req:Request, res:Response)=>{
      let productArr:Goods[] = await ProductService.list(req);
      res.render('user/product/list',{list :productArr});
    }
  },

  process : {

  }
}