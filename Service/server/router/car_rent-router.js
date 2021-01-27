/* Third-Party Module */
const express = require('express');
/* Local Module */
const CarRentController = require('../controller/car_rent-controller');
const { getCarByIdToParams } = require('../controller/car-controller');
/* Init router */
const router = express.Router();

/* ROUTERS PARAMS */
router.param('carId', getCarByIdToParams);
/* ROUTERS */
router.get('/car/session/getCar/', CarRentController.getSessionCar);
router.post('/car/session/addCar/:carId/', CarRentController.addSessionCar);

//Export Router to use in server.js
module.exports = router;
