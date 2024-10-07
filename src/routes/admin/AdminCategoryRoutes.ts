import { Router } from "express";
import { AdminCategoryController } from "../../controller/admin/AdminCategoryController";

const router = Router();

router.get('/',AdminCategoryController.view.list);
router.get('/write',AdminCategoryController.view.write);

export default router;