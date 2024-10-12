import {connect} from './index';
import mybatisMapper from '../config/mybatisConfig';
import { Goods } from '../interface/Goods';
import { GoodsDto } from '../dto/GoodsDto';


export const ProductModel = {
  list : async (param:mybatisMapper.Params)=>{
    const sql = mybatisMapper.getStatement('GoodsMapper','select',param);
    return await connect(sql);
  },

  select : async (goods:GoodsDto)=>{
    const sql = mybatisMapper.getStatement('GoodsMapper','select',goods.toParams());
    return (await connect(sql)).data[0] as GoodsDto;
  }
}