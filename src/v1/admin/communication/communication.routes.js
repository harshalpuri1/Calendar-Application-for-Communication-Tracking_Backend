const express = require('express');
const router = express.Router();

const {
  getAllMethodsByEmail,
  addMethod,
  updateMethod,
  deleteMethod,
  validateGetMethodByEmail,
  validateAddMethod,
  validateUpdateMethod,
  validateDeleteMethod
} = require('./communication.controller');

// Routes with validation middleware
router.get('/methods', validateGetMethodByEmail, getAllMethodsByEmail);
router.post('/methods', validateAddMethod, addMethod);
router.put('/methods/:id', validateUpdateMethod, updateMethod);
router.delete('/methods/:id', validateDeleteMethod, deleteMethod);

module.exports = router;
