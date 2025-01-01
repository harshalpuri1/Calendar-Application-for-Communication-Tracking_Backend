const express = require('express');
const signupRoutes = require('./auth/signup/signup.routes');
const loginRoutes = require('./auth/login/login.routes');
const logoutRoutes = require('./auth/logout/logout.routes');
const forgotPasswordRoutes = require('./auth/forgotPassword/forgotPassword.routes');

const companyRoutes = require('./admin/company/company.routes');


const router = express.Router();

router.use('/signup', signupRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);
router.use('/forgot', forgotPasswordRoutes);
router.use('/companyroute', companyRoutes);


module.exports = router;