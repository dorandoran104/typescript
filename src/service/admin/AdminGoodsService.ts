import { Request } from "express";
import { ResultObject } from "../../interface/ResultObject";
import { Goods } from "../../interface/Goods";
import { FileUtil } from "../../util/FileUtil";
import { FileModel } from "../../models/FileModel";
import { File } from "../../interface/File";

export const AdminGoodsService = {
  write : async (req:Request)=>{

    let goods:Goods = req.body;
    
    let fileArr = req.files as Express.Multer.File[];
    console.log(fileArr)

    /** 파일 업로드 */
    let fileIdxArr:number[] = [];
    if(fileArr instanceof Array && fileArr.length > 0){
      for(let i = 0; i<fileArr.length; i++){
        let uploadResult:ResultObject = await FileUtil.saveFile(fileArr[i], '/goods');
        if(uploadResult.result && uploadResult.data != null){
          fileIdxArr.push(await FileModel.insert(uploadResult.data as File))
        }
      }
    }

    console.log(fileIdxArr);
    
    

    let resultObj:ResultObject = {result :false};

    return resultObj;
  }
}