/* Third-Party Module */
const express = require('express');
/* Local Module */
const loginController = require('../controller/login-controller');
const { validateSingup } = require('../validator/login-validator');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.post('/login',loginController.login);
router.get('/logout',loginController.logout);
router.post('/signup', validateSingup, loginController.signup);

//Export Router to use in server.js
module.exports = router;