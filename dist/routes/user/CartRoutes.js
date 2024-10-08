"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JWTMiddleware_1 = require("../../middleware/user/JWTMiddleware");
const Cartcontroller_1 = require("../../controller/user/cart/Cartcontroller");
const router = (0, express_1.Router)();
router.get('', JWTMiddleware_1.JWTMiddleware.checkToken, Cartcontroller_1.CartController.view.cart);
exports.default = router;
