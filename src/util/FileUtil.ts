import fs from 'fs/promises';
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
    let resultObj:ResultObject = {result:false}
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const dirPath = uploadPath + dir
    const saveName = uniqueSuffix + '_' + file.originalname;
    const newPath = uploadPath+dir + '/' + saveName;
    try {
      await fs.mkdir(dirPath,{recursive : true})

      await fs.writeFile(newPath,file.buffer);

      resultObj.data = {
        size : file.size
        ,original_name : file.originalname
        ,save_name :saveName
        ,path : '/public/image' + dir + '/'
      }
      resultObj.result = true;
    } catch (error) {
      resultObj.errMessage = '파일 저장 실패';
    }finally{
      return resultObj;
    }
  }
}