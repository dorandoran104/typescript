import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(10);

export const BcryptUtil = {
  createBcrypt : (password:string)=>{
    return bcrypt.hashSync(password,salt);
  },
  compareBcrypt : (password:string,encodePassword:string)=>{
    return bcrypt.compare(password,encodePassword);
  }
}