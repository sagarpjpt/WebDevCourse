const express = require('express')
const router = express.Router()

const { localFileUpload, imageUpload, videoUpload, imageReducer } = require('../controllers/fileUpload')

// api routes
router.post('/localfileupload',localFileUpload)
router.post('/imageupload',imageUpload)
router.post('/videoupload',videoUpload)
router.post('/imagesizereducer',imageReducer)

module.exports = router;

