import {connect} from './index';

import mybatis from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';
import { Goods } from '../interface/Goods';

export const GoodsModel = {
  exists : async (code:string)=>{
    const sql = mybatis.getStatement('GoodsMapper','exists',{code : code});
    return (await connect(sql)).data[0].count;
  },

  insert : async (goods:mybatis.Params)=>{
    const sql = mybatis.getStatement('GoodsMapper','insert',goods)
    return (await connect(sql)) as ResultObject
  },

  update : async (goods:mybatis.Params)=>{
    const sql = mybatis.getStatement('GoodsMapper','update',goods);
    return await connect(sql)
  }
}