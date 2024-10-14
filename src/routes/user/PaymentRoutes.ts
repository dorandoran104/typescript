import { Router } from "express";
import { PaymentController } from "../../controller/user/PaymentController";
import { JWTMiddleware } from "../../middleware/JWTMiddleware";
const router = Router();

router.post('/',PaymentController.process.paymentInfo);
router.post('/verification',PaymentController.process.verification);

export default router;