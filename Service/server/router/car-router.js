/* Third-Party Module */
const express = require('express');
/* Local Module */
const carController = require('../controller/car-controller');
const { isAuth, isAdmin } = require('../middleware/auth');
/* Init router */
const router = express.Router();

/* ROUTERS PARAMS */
router.param('id', carController.getCarByIdToParams);

/* ROUTERS */
router.post('/car', [isAuth, isAdmin],carController.saveCar);
router.get('/car',carController.listCar);
router.get('/car/:id',carController.getCarById);
router.get('/car/byBranches/:branch',carController.getCarsByBranches);
router.put('/car/:id', [isAuth, isAdmin],carController.updateCarById);
router.delete('/car/:id', [isAuth, isAdmin],carController.deleteCarById);

//Export Router to use in server.js
module.exports = router;