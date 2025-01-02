const express = require('express');
const router = express.Router();
const {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany,
  validateGetCompany,
  validateAddCompany,
  validateUpdateCompany,
  validateDeleteCompany,
} = require('./company.controller');

router.get('/get', validateGetCompany, getCompanies);
router.post('/add', validateAddCompany, addCompany);
router.put('/update/:id', validateUpdateCompany, updateCompany);
router.delete('/delete/:id', validateDeleteCompany, deleteCompany);

module.exports = router;
