import { Request } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { CategoryModel } from "../../models/CategoryModel";
import { Category } from "../../interface/Category";

export const AdminCategoryService = {
  write : async (req:Request) =>{
    let resultObj:ResultObject = {result : false};
    let {first_category_idx, first_category_input, second_category_idx, second_category_input} = req.body;

    if(first_category_idx === 'a'){
      let category:Category = {
        name : first_category_input
        ,depth : 1
      }
      resultObj = await CategoryModel.insert(category);
      if(!resultObj.result){
        throw new Error('저장에 실패하였습니다.');
      }
      first_category_idx = resultObj.data.insertId;
    }
    
    return resultObj;
  }
}