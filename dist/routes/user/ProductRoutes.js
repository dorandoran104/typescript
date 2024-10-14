"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../../controller/user/ProductController");
const router = (0, express_1.Router)();
router.get('/:category', ProductController_1.ProductController.view.list);
router.get('/detail/:code', ProductController_1.ProductController.view.detail);
exports.default = router;
