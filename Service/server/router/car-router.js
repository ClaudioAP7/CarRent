//Third-Party Module
const express = require('express');
//Local Module
const carController = require('../controller/car-controller');
//Init router
const router = express.Router();

//PARAMS
//ROUTERS
router.get('/car',carController.responseServer);

//Export Router to use in server.js
module.exports = router;