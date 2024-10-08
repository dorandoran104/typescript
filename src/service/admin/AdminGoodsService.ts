import { Request } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { Goods } from "../../interface/Goods";
import { FileUtil } from "../../util/FileUtil";

export const AdminGoodsService = {
  write : async (req:Request)=>{

    let goods:Goods = req.body;
    
    let fileArr = req.files as Express.Multer.File[];
    console.log(fileArr)

    /** 파일 업로드 */
    if(fileArr instanceof Array && fileArr.length > 0){
      for(let i = 0; i<fileArr.length; i++){
        let uploadResult:ResultObject = await FileUtil.saveFile(fileArr[i], '/goods/');
      }
    }
    
    

    let resultObj:ResultObject = {result :false};

    return resultObj;
  }
}