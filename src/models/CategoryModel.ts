import {connect} from './index';
import mybatis from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';
import { Category } from '../interface/Category';

export const CategoryModel = {
  insert : async (category:Category)=>{
    const sql = mybatis.getStatement('CategoryMapper','insert',category);
    const resultObj:ResultObject = await connect(sql);
    return resultObj;
  }
}