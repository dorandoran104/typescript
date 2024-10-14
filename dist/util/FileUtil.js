"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtil = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const uploadPath = './public/image';
exports.FileUtil = {
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
    saveFile: (file, dir) => __awaiter(void 0, void 0, void 0, function* () {
        let resultObj = { result: false };
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const dirPath = uploadPath + dir;
        const saveName = uniqueSuffix + '_' + file.originalname;
        const newPath = uploadPath + dir + '/' + saveName;
        try {
            yield promises_1.default.mkdir(dirPath, { recursive: true });
            yield promises_1.default.writeFile(newPath, file.buffer);
            resultObj.data = {
                size: file.size,
                original_name: file.originalname,
                save_name: saveName,
                path: '/public/image' + dir + '/'
            };
            resultObj.result = true;
        }
        catch (error) {
            resultObj.errMessage = '파일 저장 실패';
        }
        finally {
            return resultObj;
        }
    })
};
