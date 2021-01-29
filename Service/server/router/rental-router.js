/* Third-Party Module */
const express = require('express');
/* Local Module */
const RentalController = require('../controller/rental-controller');
const { getUserByIdToParams } = require('../controller/user-controller');
const { isAuth } = require('../middleware/auth');
/* Init router */
const router = express.Router();

/* ROUTERS PARAMS */
router.param('userId', getUserByIdToParams);
/* ROUTERS */
router.post('/generatecarrent/:userId/', [isAuth], RentalController.generateCarRent);
router.get('/returncar/:userId/', [isAuth], RentalController.returnCar);
router.get('/rents/', [isAuth], RentalController.listRent);
router.get('/rent/:id', [isAuth], RentalController.getRentById);

//Export Router to use in server.js
module.exports = router;