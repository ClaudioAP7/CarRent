/* Third-Party Module */
const express = require('express');
/* Local Module */
const CategoryCarController = require('../controller/car_category-controller');
const { isAuth, isAdmin } = require('../middleware/auth');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.post('/category', [isAuth, isAdmin], CategoryCarController.saveCarCategory);
router.get('/category', CategoryCarController.listCarCategory);
router.get('/category/:id', CategoryCarController.getCarCategoryById);
router.put('/category/:id', [isAuth, isAdmin],CategoryCarController.updateCarCategoryById);
router.delete('/category/:id', [isAuth, isAdmin],CategoryCarController.deleteCarCategoryById);

//Export Router to use in server.js
module.exports = router;