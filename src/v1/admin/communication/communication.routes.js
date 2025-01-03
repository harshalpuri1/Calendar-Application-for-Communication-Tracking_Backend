const express = require('express');
const router = express.Router();
const CommunicationController = require('./communication.controller');
const {
  validateAddMethod,
  validateDeleteMethod,
  validateGetMethodByEmail
} = require('./communication.validation');

// Routes
router.get('/methods', CommunicationController.getAllMethods);
router.post('/methods', validateAddMethod, CommunicationController.addMethod);
router.delete('/methods/:id', validateDeleteMethod, CommunicationController.deleteMethod);
router.get('/methods/:email', validateGetMethodByEmail, CommunicationController.getMethodByEmail);

module.exports = router;
