import { Request, Response } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { AdminCategoryService } from "../../service/admin/AdminCategoryService";

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
    /**
     * insert
     * @param req 
     * @param res 
     */
    write : async (req:Request,res:Response)=>{
      let resultObj:ResultObject = {result : false};
      try {
        resultObj = await AdminCategoryService.write(req);
      } catch (error) {
        console.log(error);
        resultObj.result = false;
        resultObj.errMessage = '저장에 실패하였습니다.';
      } finally {
        res.json(resultObj);
      }
    },

    getDescendantList : async (req:Request,res:Response)=>{
      let resultObj:ResultObject = {result : false};
      try {
        resultObj = await AdminCategoryService.getDescendantList(req.body.ancestor_idx);
      } catch (error) {
        console.log(error);
        resultObj.result = false;
        resultObj.errMessage = '오류가 발생하였습니다.';
      } finally {
        res.json(resultObj);
      }
    }
  }
}