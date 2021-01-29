/* Third-Party Module */
const express = require('express');
/* Local Module */
const BranchOfficeController = require('../controller/branch_office-controller');
const { isAuth, isAdmin } = require('../middleware/auth');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.post('/branch-office', [isAuth, isAdmin],BranchOfficeController.saveBranchOffice);
router.get('/branch-office', [isAuth],BranchOfficeController.listBranchOffice);
router.get('/branch-office/:id', [isAuth],BranchOfficeController.getBranchOfficeById);
router.put('/branch-office/:id', [isAuth, isAdmin],BranchOfficeController.updateBranchOfficeById);

//Export Router to use in server.js
module.exports = router;