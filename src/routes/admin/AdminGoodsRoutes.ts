import { Router } from "express";
import { AdminGoodsController } from "../../controller/admin/AdminGoodsController";
import {FileMiddleWare} from '../../middleware/FileMiddleWare';

const router:Router = Router();

router.get('/',AdminGoodsController.view.list);
router.get('/write',AdminGoodsController.view.write);

router.post('/write',FileMiddleWare.array('file'), AdminGoodsController.process.write);

export default router;