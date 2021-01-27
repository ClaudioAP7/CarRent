/* Third-Party Module */
const express = require('express');
/* Local Module */
const carController = require('../controller/car-controller');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.post('/car',carController.saveCar);
router.get('/car',carController.listCar);
router.get('/car/:id',carController.getCarById);
router.get('/car/byBranches/:branch',carController.getCarsByBranches);
router.put('/car/:id',carController.updateCarById);

//Export Router to use in server.js
module.exports = router;