"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminEmployeeController_1 = require("../../controller/admin/AdminEmployeeController");
const router = (0, express_1.Router)();
router.get('/', AdminEmployeeController_1.AdminEmployeeController.view.list);
router.get('/write', AdminEmployeeController_1.AdminEmployeeController.view.write);
router.post('/write', AdminEmployeeController_1.AdminEmployeeController.process.write);
exports.default = router;
