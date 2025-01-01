const express = require('express');
const router = express.Router();
const {logout} = require('./logout.controller');
const authenticate = require('../middlewares/session_authentication')

router.post('/user',authenticate,logout);

module.exports = router;