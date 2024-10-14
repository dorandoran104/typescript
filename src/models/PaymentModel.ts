import {connect} from './index';
import mybatisMapper from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';
import { PaymentDto } from '../dto/PaymentDto';
import { PaymentProductDto } from '../dto/PaymentProductDto';

export const PaymentModel = {
  exists : async (payment:PaymentDto)=>{
    const sql = mybatisMapper.getStatement('PaymentMapper','exists',payment.toParams());
    return (await connect(sql)).data[0].count as number;
  },

  insert : async(payment:PaymentDto)=>{
    const sql = mybatisMapper.getStatement('PaymentMapper','insert',payment.toParams());
    return await connect(sql) as ResultObject;
  },

  insertPaymentProduct : async(paymentProduct:PaymentProductDto)=>{
    const sql = mybatisMapper.getStatement('PaymentMapper','insertPaymentProduct',paymentProduct.toParams());
    return await connect(sql);
  }
}