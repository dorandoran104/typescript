import { Router } from "express";
import { AdminCategoryController } from "../../controller/admin/AdminCategoryController";

const router = Router();

router.get('/',AdminCategoryController.view.list);
router.get('/write',AdminCategoryController.view.write);

router.post('/write',AdminCategoryController.process.write);
router.post('/getDescendantList',AdminCategoryController.process.getDescendantList);

export default router;