const express = require('express');
const router = express.Router();
const { getCompanies, addCompany, updateCompany, deleteCompany } = require('./company.controller');

router.get('/get', getCompanies);
router.post('/add', addCompany);
router.put('/update:id', updateCompany);
router.delete('/delete:id', deleteCompany);

module.exports = router;
