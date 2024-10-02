"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const homeRoutes_1 = __importDefault(require("./routes/user/homeRoutes"));
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/', homeRoutes_1.default);
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.listen(port, () => {
    console.log('server running');
    const networkInterfaces = os_1.default.networkInterfaces();
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
});
