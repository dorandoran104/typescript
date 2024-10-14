"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PaymentController_1 = require("../../controller/user/PaymentController");
const router = (0, express_1.Router)();
router.post('/', PaymentController_1.PaymentController.process.paymentInfo);
router.post('/verification', PaymentController_1.PaymentController.process.verification);
exports.default = router;
