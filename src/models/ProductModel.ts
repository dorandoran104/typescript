import {connect} from './index';
import mybatisMapper from '../config/mybatisConfig';
import { Goods } from '../interface/Goods';


export const ProductModel = {
  list : async (param:mybatisMapper.Params)=>{
    const sql = mybatisMapper.getStatement('GoodsMapper','select',param);
    return (await connect(sql)).data as Goods[]
  }
}