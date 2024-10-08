import {connect} from './index';
import mybatis from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';
import { Category } from '../interface/Category';
import { CategoryRelationship } from '../interface/CategoryRelationship';

export const CategoryModel = {
  /**
   * 카테고리 insert
   * @param category 
   * @returns 
   */
  insert : async (category:Category)=>{
    const sql = mybatis.getStatement('CategoryMapper','insert',category);
    const resultObj:ResultObject = await connect(sql);
    return resultObj;
  },

  /**
   * 카테고리 클로져 insert
   * @param categoryRelationship 
   * @returns 
   */
  insertAncestor : async (categoryRelationship:CategoryRelationship)=>{
    const sql = mybatis.getStatement('CategoryMapper','insertAncestor',categoryRelationship);
    const resultObj:ResultObject = await connect(sql);
    return resultObj;
  },

  /**
   * 카테고리 뎁스 리스트
   * @param depth 
   */
  depthList : async (depth:number)=>{
    const sql = mybatis.getStatement('CategoryMapper','depthList',{depth : depth});
    return await connect(sql);
  },

  /**
   * 자손 카테고리 가져오기
   * @param ancestor_idx 
   * @returns 
   */
  getDescendantList : async(ancestor_idx:number)=>{
    const sql = mybatis.getStatement('CategoryMapper','descendantList',{ancestor_idx : ancestor_idx});
    return await connect(sql);
  }
}