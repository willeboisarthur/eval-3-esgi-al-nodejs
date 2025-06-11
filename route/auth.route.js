const express = require('express');
const authController = require("./../controller/auth.controller.js");

const router = express.Router();

router.get("/signin",authController.signin);
router.get("/login",authController.login);

module.exports = router;