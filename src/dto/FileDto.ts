import { File } from "../interface/File";

export class FileDto {
  idx!: number;
  path!: string;
  save_name!: string;
  original_name!: string;
  size!: number;
  regist_date!: string;

  toParams():Record<string,any>{
    return {
      idx : this.idx
      ,path : this.path
      ,save_name : this.save_name
      ,original_name : this.original_name
      ,size : this.size
      ,regist_date : this.regist_date
    }
  }
}