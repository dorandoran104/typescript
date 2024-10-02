import express, {Application,Request,Response,NextFunction} from 'express';
import path from 'path';

import HomeRouter from './routes/user/homeRoutes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/',HomeRouter);

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.listen('3002',()=>{
  console.log('server running')
})