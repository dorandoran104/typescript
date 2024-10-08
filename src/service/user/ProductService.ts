import { Request } from "express";
import { ProductModel } from "../../models/ProductModel";

export const ProductService = {
  list : async(req:Request)=>{
    return await ProductModel.list(req.params);
  }
}