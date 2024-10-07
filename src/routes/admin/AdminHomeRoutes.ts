import { Router } from "express";
import { AdminHomeController } from "../../controller/admin/AdminHomeController";
import { JWTMiddleware } from "../../middleware/user/JWTMiddleware";

const router:Router = Router();

router.get('/',AdminHomeController.view.home);
router.get('/login',AdminHomeController.view.login)

router.post('/login',AdminHomeController.process.login);

export default router;