import { Router } from "express";
import { ProductController } from "../../controller/user/ProductController";
import { JWTMiddleware } from "../../middleware/JWTMiddleware";

const router = Router();

router.get('/:category',ProductController.view.list);
router.get('/detail/:code',ProductController.view.detail);

export default router;