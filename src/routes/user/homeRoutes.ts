import express, {Application,Router,Request,Response,NextFunction} from 'express';
import { view, process } from '../../controller/user/home/homeController';

const router = Router();

router.get(('/'),view.home)
router.get('/login',view.login)
router.get('/register',view.register);

router.post('/login',process.login);
router.post('/register',process.register);

export default router;
