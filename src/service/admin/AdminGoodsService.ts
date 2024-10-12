import { Request } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { Goods } from "../../interface/Goods";
import { FileUtil } from "../../util/FileUtil";
import { FileModel } from "../../models/FileModel";
import { File } from "../../interface/File";
import { RandomUtil } from "../../util/RandomUtil";
import { GoodsModel } from "../../models/GoodsModel";

export const AdminGoodsService = {
  write : async (req:Request)=>{

    let goods:Goods = req.body;

    let existsFlag = false;
    while(existsFlag == false){
      const randomCode = RandomUtil.createRandomCode(13);
      if(await GoodsModel.exists(randomCode) == 0){
        existsFlag =true;
        goods.code = randomCode;
      }
    }

    let resultObj:ResultObject = await GoodsModel.insert(goods);
    if(resultObj.result){
      goods.idx = resultObj.data.insertId;
      let fileArr = req.files as Express.Multer.File[];
      /** 파일 업로드 */
      let fileIdxArr:number[] = [];
      if(fileArr instanceof Array && fileArr.length > 0){
        for(let i = 0; i<fileArr.length; i++){
          let uploadResult:ResultObject = await FileUtil.saveFile(fileArr[i], '/goods/' + resultObj.data.insertId);
          if(uploadResult.result && uploadResult.data != null){
            fileIdxArr.push(await FileModel.insert(uploadResult.data as File))
          }
        }
      }
      console.log(fileIdxArr);
      goods.file_idx = fileIdxArr.join('&^');
      await GoodsModel.update(goods);
    }
    return resultObj;
  }
}