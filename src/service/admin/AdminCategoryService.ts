import { Request } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { CategoryModel } from "../../models/CategoryModel";
import { Category } from "../../interface/Category";
import { CategoryRelationship } from "../../interface/CategoryRelationship";

export const AdminCategoryService = {
  /**
   * 카테고리 insert
   * @param req 
   * @returns 
   */
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
      let relationshipParam:CategoryRelationship = {
        ancestor_idx : first_category_idx
        ,descendant_idx : first_category_idx
      };
      resultObj = await CategoryModel.insertAncestor(relationshipParam);
      if(!resultObj.result){
        throw new Error('저장에 실패하였습니다.');
      }
    }

    let category:Category = {
      name : second_category_input
      ,depth : 2
    }
    resultObj = await CategoryModel.insert(category);
    if(!resultObj.result){
      throw new Error('저장에 실패하였습니다.');
    }

    let relationshipParam:CategoryRelationship = {
      ancestor_idx : first_category_idx
      ,descendant_idx : resultObj.data.insertId
    }

    resultObj = await CategoryModel.insertAncestor(relationshipParam);
    return resultObj;
  },

  /**
   * 카테고리 뎁스 리스트
   * @param depth 
   */
  getCategoryList : async (depth:number)=>{
    let resultObj:ResultObject = await CategoryModel.depthList(depth);
    const categoryList:Category[] = resultObj.data;
    return categoryList;
  },


  getDescendantList : async (ancestor_idx:number)=>{
    let resultObj:ResultObject = await CategoryModel.getDescendantList(ancestor_idx);
    return resultObj;
  }
}