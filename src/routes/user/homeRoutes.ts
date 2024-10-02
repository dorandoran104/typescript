import express, {Application,Router,Request,Response,NextFunction} from 'express';
import {login} from '../../controller/user/homeController';

const router = Router();

router.get(('/'),(req:Request,res:Response)=>{
  res.render('user/home/home')
})

router.get('/login',(req:Request, res:Response)=>{
  res.render('user/home/login')
})

router.post('/login',login);

export default router;
