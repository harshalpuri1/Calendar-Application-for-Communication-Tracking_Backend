const express = require('express');
const { login,validateLogin } = require('./login.controller');

const router = express.Router();

router.post('/user', validateLogin, login);

module.exports = router;