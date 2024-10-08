import { Router } from "express";
import { JWTMiddleware } from "../../middleware/JWTMiddleware";
import { CartController } from "../../controller/user/Cartcontroller";

const router:Router = Router();

router.get('/',JWTMiddleware.checkToken,CartController.view.cart);

export default router;