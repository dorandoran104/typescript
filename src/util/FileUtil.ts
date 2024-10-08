import fs from 'fs';
import path from 'path';
import { ResultObject } from '../interface/ResultObject';

const uploadPath = './public/image'
export const FileUtil = {
  
  // saveFile : async (file:Express.Multer.File,dir:string)=>{
  //   let resultObj = {result : false};
  //   let newPath = uploadPath+dir;

  //   fs.mkdir(newPath,{recursive : true}, (err)=>{
  //     if(err){
  //       throw new Error('파일 업로드 실패');
  //     }
      
  //   })
  //   return resultObj;
  // }
  saveFile : async (file:Express.Multer.File,dir:string)=>{
    let resultObj = {result : false};
    let newPath = uploadPath+dir;

    try {
      await fs.mkdir(newPath,{ recursive : true}, (err)=>{
        throw new Error();
      });

      await fs.writeFile(newPath,file.buffer,(err)=>{
        throw new Error();
      })
      resultObj.result = true;
    } catch (error) {
      
    }finally{
      return resultObj;
    }
  }
}