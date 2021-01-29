/* Third-Party Module */
const express = require('express');
/* Local Module */
const BranchOfficeController = require('../controller/branch_office-controller');
const { isAuth, isAdmin } = require('../middleware/auth');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.post('/branch-office', [isAuth, isAdmin],BranchOfficeController.saveBranchOffice);
router.get('/branch-office',BranchOfficeController.listBranchOffice);
router.get('/branch-office/:id',BranchOfficeController.getBranchOfficeById);
router.put('/branch-office/:id', [isAuth, isAdmin],BranchOfficeController.updateBranchOfficeById);
router.delete('/branch-office/:id', [isAuth, isAdmin],BranchOfficeController.deleteBranchOfficeById);

//Export Router to use in server.js
module.exports = router;