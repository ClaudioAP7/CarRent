/* Third-Party Module */
const express = require('express');
/* Local Module */
const BranchOfficeController = require('../controller/branch_office-controller');
/* Init router */
const router = express.Router();

/* ROUTERS */
router.post('/branch-office',BranchOfficeController.saveBranchOffice);
router.get('/branch-office',BranchOfficeController.listBranchOffice);
router.get('/branch-office/:id',BranchOfficeController.getBranchOfficeById);
router.put('/branch-office/:id',BranchOfficeController.updateBranchOfficeById);

//Export Router to use in server.js
module.exports = router;