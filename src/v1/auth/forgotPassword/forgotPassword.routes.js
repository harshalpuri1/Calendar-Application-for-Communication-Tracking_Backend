const express = require('express');
const { validateEmailForgot,sendOtp, sendOtpEmailValidation, forgotPassword } = require('./forgotPassword.controller');
const router= express.Router();


router.get('/send/otp', sendOtpEmailValidation,sendOtp);
router.put('/password', validateEmailForgot, forgotPassword);

module.exports = router;