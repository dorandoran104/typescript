"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Cartcontroller_1 = require("../../controller/user/Cartcontroller");
const router = (0, express_1.Router)();
router.get('/', Cartcontroller_1.CartController.view.cart);
exports.default = router;
