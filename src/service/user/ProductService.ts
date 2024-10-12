import { Request } from "express";
import { ProductModel } from "../../models/ProductModel";
import { FileModel } from "../../models/FileModel";
import { Goods } from "../../interface/Goods";
import { FileDto } from "../../dto/FileDto";
import { ResultObject } from "../../interface/ResultObject";
import { File } from "../../interface/File";
import { GoodsDto } from "../../dto/GoodsDto";

export const ProductService = {
  /**
   * 상품 리스트 출력
   * @param req 
   * @returns 
   */
  list : async(req:Request)=>{
    let resultObj = await ProductModel.list(req.params);
    for(let i = 0 ; i<resultObj.data.length ; i++){
      const file_idx = Number(resultObj.data[i].file_idx.split('&^')[0]);
      const fileDto = new FileDto();
      fileDto.idx = file_idx;
      const ResultObject:FileDto = await FileModel.select(fileDto);
      resultObj.data[i].path = ResultObject.path;
    }
    return resultObj.data;
  },
  /**
   * 상품 상세
   * @param req 
   * @returns 
   */
  select : async(req:Request)=>{
    const code = req.params.code;
    let goodsDto = new GoodsDto();
    goodsDto.code = code;

    goodsDto = await ProductModel.select(goodsDto);

    if(goodsDto.file_idx != null && goodsDto.file_idx != ''){
      const file_idx = Number(goodsDto.file_idx.split('&^')[0]);
      let fileDto = new FileDto();
      fileDto.idx = file_idx;
      fileDto = await FileModel.select(fileDto);
      goodsDto.path = fileDto.path;
    }
    return goodsDto;
    
  }
}