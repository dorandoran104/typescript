"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminHomeController_1 = require("../../controller/admin/AdminHomeController");
const router = (0, express_1.Router)();
router.get('/', AdminHomeController_1.AdminHomeController.view.home);
router.get('/login', AdminHomeController_1.AdminHomeController.view.login);
router.post('/login', AdminHomeController_1.AdminHomeController.process.login);
exports.default = router;
