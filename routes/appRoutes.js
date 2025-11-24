"use strict";
const express = require("express");
const router = express.Router();
const appController = require('../controllers/appController');
const auth = require('../middleware/auth')


router.get(['/home', '/'], appController.home);
router.get('/login', appController.loginPage);

module.exports = router;