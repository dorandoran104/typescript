import { Router } from "express";
import { PaymentController } from "../../controller/user/PaymentController";
import { JWTMiddleware } from "../../middleware/JWTMiddleware";
const router = Router();

router.post('/',JWTMiddleware.checkToken, PaymentController.process.paymentInfo);

export default router;