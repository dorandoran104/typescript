import { Router } from "express";
import { ProductController } from "../../controller/user/ProductController";

const router = Router();

router.get('/:category',ProductController.view.list);
export default router;