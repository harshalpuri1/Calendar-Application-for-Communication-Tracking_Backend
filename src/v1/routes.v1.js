const express = require('express');
const signupRoutes = require('./auth/signup/signup.routes');
const loginRoutes = require('./auth/login/login.routes');
const adminloginRoutes = require('./auth/adminlogin/login.routes');
const adminsignupRoutes = require('./auth/adminsignup/signup.routes');
const logoutRoutes = require('./auth/logout/logout.routes');
const forgotPasswordRoutes = require('./auth/forgotPassword/forgotPassword.routes');
const communicationRoute = require('./admin/communication/communication.routes');
const companyRoutes = require('./admin/company/company.routes');


const router = express.Router();

router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/admin', adminloginRoutes);
router.use('/admin/signup', adminsignupRoutes);
router.use('/logout', logoutRoutes);
router.use('/forgot', forgotPasswordRoutes);
router.use('/company', companyRoutes);
router.use('/communication', communicationRoute);


module.exports = router;