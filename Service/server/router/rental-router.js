/* Third-Party Module */
const express = require('express');
/* Local Module */
const RentalController = require('../controller/rental-controller');
const { getUserByIdToParams } = require('../controller/user-controller');
const { getCarByIdToParams } = require('../controller/car-controller');
/* Init router */
const router = express.Router();

/* ROUTERS PARAMS */
router.param('userId', getUserByIdToParams);
/* ROUTERS */
router.post('/generatecarrent/:userId/', RentalController.generateCarRent);
router.get('/returncar/:userId/', RentalController.returnCar);

//Export Router to use in server.js
module.exports = router;