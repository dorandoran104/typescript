import {connect} from './index';

import mybatis from '../config/mybatisConfig';
import { ResultObject } from '../interface/ResultObject';
import { File } from '../interface/File';
import { FileDto } from '../dto/FileDto';

export const FileModel = {
  insert : async (file:File)=>{
    const sql = mybatis.getStatement('FileMapper','insert',file);
    return (await connect(sql)).data.insertId;
  },

  select : async (file:FileDto) => {
    const sql = mybatis.getStatement('FileMapper','select',file.toParams());
    return (await connect(sql)).data[0];
  }
}