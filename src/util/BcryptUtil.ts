import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(10);

export const BcryptUtil = {
  createBycrpt : (password:string)=>{
    return bcrypt.hashSync(password,salt);
  },
  compareBycrypt : (password:string,encodePassword:string)=>{
    return bcrypt.compare(password,encodePassword);
  }
}