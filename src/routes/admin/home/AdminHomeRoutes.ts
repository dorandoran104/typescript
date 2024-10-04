import { Router } from "express";
import { AdminHomeController } from "../../../controller/admin/home/AdminHomeController";

const router:Router = Router();

router.get('/',AdminHomeController.view.home);
router.get('/login',AdminHomeController.view.login)

router.post('/login',AdminHomeController.process.login);

export default router;