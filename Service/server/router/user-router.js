/* Third-Party Module */
const express = require('express');
/* Local Module */
const userController = require('../controller/user-controller');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.get('/user',userController.listUser);
router.get('/user/:id',userController.getUserById);
router.put('/user/:id',userController.updateUserById);

//Export Router to use in server.js
module.exports = router;