import express, {Application,Router,Request,Response,NextFunction} from 'express';
import {home,login,register} from '../../controller/user/home/homeController';
import {doLogin} from '../../controller/user/home/homeRestController';

const router = Router();

router.get(('/'),home)
router.get('/login',login)
router.get('/register',register);

router.post('/login',doLogin);

export default router;
