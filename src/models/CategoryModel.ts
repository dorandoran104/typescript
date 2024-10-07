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

  insertAncestor : async (categoryRelationship:CategoryRelationship)=>{
    const sql = mybatis.getStatement('CategoryMapper','insertAncestor',categoryRelationship);
    const resultObj:ResultObject = await connect(sql);
    return resultObj;
  }
}