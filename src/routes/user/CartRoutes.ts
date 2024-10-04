import { Router } from "express";
import { JWTMiddleware } from "../../middleware/user/JWTMiddleware";
import { CartController } from "../../controller/user/cart/Cartcontroller";

const router:Router = Router();

router.get('',JWTMiddleware.checkToken,CartController.view.cart);

export default router;