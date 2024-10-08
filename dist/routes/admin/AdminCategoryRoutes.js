"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminCategoryController_1 = require("../../controller/admin/AdminCategoryController");
const router = (0, express_1.Router)();
router.get('/', AdminCategoryController_1.AdminCategoryController.view.list);
router.get('/write', AdminCategoryController_1.AdminCategoryController.view.write);
router.post('/write', AdminCategoryController_1.AdminCategoryController.process.write);
exports.default = router;
