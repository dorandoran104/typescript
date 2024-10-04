import express from 'express';
import path from 'path';
import os from 'os'
import cookieParser from 'cookie-parser';

import HomeRouter from './routes/user/homeRoutes'
import CartRouter from './routes/user/CartRoutes';

const port:Number = 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/',HomeRouter);
app.use('/cart',CartRouter);

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