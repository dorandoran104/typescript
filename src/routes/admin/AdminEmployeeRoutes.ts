import { Router } from "express";
import { AdminEmployeeController } from "../../controller/admin/AdminEmployeeController";
import { JWTMiddleware } from "../../middleware/user/JWTMiddleware";

const router:Router = Router();

router.get('/',AdminEmployeeController.view.list)
router.get('/write',AdminEmployeeController.view.write)

router.post('/write',AdminEmployeeController.process.write);

export default router;