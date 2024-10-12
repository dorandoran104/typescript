import express from 'express';
import path from 'path';
import os from 'os'
import cookieParser from 'cookie-parser';
import cors from 'cors';

import HomeRouter from './routes/user/homeRoutes'
import CartRouter from './routes/user/CartRoutes';
import ProductRouter from './routes/user/ProductRoutes';

import AdminHomeRouter from './routes/admin/AdminHomeRoutes';
import AdminEmployeeRouter from './routes/admin/AdminEmployeeRoutes';
import AdminCategoryRouter from './routes/admin/AdminCategoryRoutes';
import AdminGoodsRouter from './routes/admin/AdminGoodsRoutes';

import { JWTMiddleware } from './middleware/JWTMiddleware';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import from ''

const port:Number = 3000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:8081/,http://192.168.35.210:8081/', // 허용할 도메인
  methods: ['GET', 'POST'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
};

// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname, '../public/image')));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/',HomeRouter);
app.use('/cart',CartRouter);
app.use('/product', ProductRouter);
// app.use('/api/product',ProductRouter);

app.use('/admin',JWTMiddleware.checkAdminToken);
app.use('/admin',AdminHomeRouter);
app.use('/admin/employee',AdminEmployeeRouter);
app.use('/admin/category',AdminCategoryRouter);
app.use('/admin/goods',AdminGoodsRouter);

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.listen(port,()=>{
  console.log('server running')
  const networkInterfaces = os.networkInterfaces();
  let serverIp = 'localhost'; // 기본값

  // 네트워크 인터페이스 중 IPv4를 찾아서 IP 주소 설정
  for (const interfaceName of Object.keys(networkInterfaces)) {
    const interfaces = networkInterfaces[interfaceName];
    if (interfaces) {
      for (const interfaceInfo of interfaces) {
        if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
          serverIp = interfaceInfo.address;
        }
      }
    }
  }

  console.log(`Server running at http://${serverIp}:${port}`);
})