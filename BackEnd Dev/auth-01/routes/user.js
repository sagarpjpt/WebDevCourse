const express = require('express');
const router = express.Router();

// import controllers
const { signup } = require('../controllers/Auth');

// routes
router.post('/signup', signup);

module.exports = router;