const express = require('express');
const router= express.Router();
const { validateSignup } = require('./signup.controller');
const { signup } = require('./signup.controller');

router.post('/user', validateSignup, signup);

module.exports = router;