const express = require('express');
const userController = require("./../controller/user.controller.js");

const router = express.Router();

router.get("/signin",auth,userController.getAll);

module.exports = router;