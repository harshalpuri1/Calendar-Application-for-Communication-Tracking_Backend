const express = require('express');
const router = express.Router();
const {
  getCommunications,
  addCommunication,
  updateCommunication,
  deleteCommunication,
  validateGetCommunication,
  validateAddCommunication,
  validateUpdateCommunication,
  validateDeleteCommunication,
} = require('./communication.controller');

router.get('/get', validateGetCommunication, getCommunications);
router.post('/add', validateAddCommunication, addCommunication);
router.put('/update/:id', validateUpdateCommunication, updateCommunication);
router.delete('/delete/:id', validateDeleteCommunication, deleteCommunication);

module.exports = router;
