const express = require('express');
const router = express.Router();
const { auth } = require("../middlewares/auth");

// import controllers fn
const {resetPasswordToken, resetPassword} = require('../controllers/ResetPassword');
const { sendOtp, signUp, login, changePassword } = require('../controllers/Auth');

router.post('/sendotp', sendOtp);
router.post('/signup', signUp);
router.post('/login', login);

// protected routes
router.post('/reset-password-token', auth, resetPasswordToken);
router.post('/reset-password', auth, resetPassword);
router.put("/changepassword", auth, changePassword);

module.exports = router;