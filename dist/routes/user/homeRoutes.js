"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get(('/'), (req, res) => {
    res.render('user/home/home');
});
router.get('/login', (req, res) => {
    res.render('user/home/login');
});
exports.default = router;
