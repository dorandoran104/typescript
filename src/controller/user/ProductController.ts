import { Request, Response } from "express";
import { Goods } from "../../interface/Goods";
import { ProductService } from "../../service/user/ProductService";
import { ResultObject } from "../../interface/ResultObject";
import { GoodsDto } from "../../dto/GoodsDto";

export const ProductController = {
  view : {
    /**
     * 상품 리스트 출력
     * @param req 
     * @param res 
     */
    list : async (req:Request, res:Response)=>{
      let productArr:Goods[] = await ProductService.list(req);
      res.render('user/product/list',{list : productArr});
    },

    detail : async (req:Request, res:Response)=>{
      let product:GoodsDto = await ProductService.select(req);
      res.render('user/product/detail',{detail : product})
    }
  },

}