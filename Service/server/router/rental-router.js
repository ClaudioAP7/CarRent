/* Third-Party Module */
const express = require('express');
/* Local Module */
const CategoryCarController = require('../controller/car_category-controller');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.post('/category',CategoryCarController.saveCarCategory);
router.get('/category',CategoryCarController.listCarCategory);
router.get('/category/:id',CategoryCarController.getCarCategoryById);
router.put('/category/:id',CategoryCarController.updateCarCategoryById);

//Export Router to use in server.js
module.exports = router;