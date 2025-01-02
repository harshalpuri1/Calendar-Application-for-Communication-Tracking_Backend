const express = require('express');
const { login,validateLogin } = require('./login.controller');

const router = express.Router();

router.post('/login', validateLogin, login);

module.exports = router;