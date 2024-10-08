import { Request, Response } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { AdminGoodsService } from "../../service/admin/AdminGoodsService";
import { AdminCategoryService } from "../../service/admin/AdminCategoryService";
import { Category } from "../../interface/Category";

export const AdminGoodsController = {
  view : {
    /**
     * 상품 리스트
     * @param req 
     * @param res 
     */
    list : async(req:Request, res:Response)=>{
      res.render('admin/goods/list');
    },

    /**
     * 상품 등록 페이지
     * @param req 
     * @param res 
     */
    write : async (req:Request,res:Response)=>{
      let resultObj:ResultObject = {result : true};
      const categoryList:Category[] = await AdminCategoryService.getCategoryList(1);
      resultObj.data = categoryList;
      res.render('admin/goods/write',resultObj);
    }
  },

  process : {
    write : async (req:Request, res:Response)=>{
      let resultObj:ResultObject = {result : false};
      try {
        resultObj = await AdminGoodsService.write(req);
      } catch (error) {
        resultObj.result = false;
        resultObj.errMessage = '저장에 실패하였습니다.';
      } finally {
        res.json(resultObj);
      }
    }
  }
}