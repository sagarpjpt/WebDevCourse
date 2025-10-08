const express = require('express');
const router = express.Router();

// import controllers
const { signup, login } = require('../controllers/Auth');
const {auth, isStudent, isAdmin} = require('../middlewares/auth');

// routes
router.post('/signup', signup);
router.post('/login', login);

// protected routes
router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected route for Students"
    })
})

router.get('/admin', auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "welcome to protected route for admin"
    })
})

module.exports = router;