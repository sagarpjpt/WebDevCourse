const express = require('express');
const router = express.Router();
const { auth } = require("../middlewares/auth");

// import controllers fn
const { updateProfile, deleteAccount, getUserDetails, updateDP } = require("../controllers/Profile");


// Protect the route using auth middleware
router.put('/update-display-picture', auth, updateDP)
router.put('/update-profile', auth, updateProfile);
router.get('/get-user-details', auth, getUserDetails);
router.delete('/delete-account', auth, deleteAccount);



module.exports = router;