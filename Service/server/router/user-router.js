/* Third-Party Module */
const express = require('express');
/* Local Module */
const userController = require('../controller/user-controller');
const { isAuth, isAdmin } = require('../middleware/auth');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.get('/user', [isAuth, isAdmin],userController.listUser);
router.get('/user/:id',userController.getUserById);
router.put('/user/:id', [isAuth],userController.updateUserById);

//Export Router to use in server.js
module.exports = router;