const express = require('express')
const router = express.Router();

const {createPost} = require('../controllers/postController')

const {getPosts} = require('../controllers/postController')

const {likeUnlikePost} = require('../controllers/likeController')

router.post('/createPost', createPost)
router.get('/getPosts', getPosts)
router.put('/likePost/:postId/:userId', likeUnlikePost)

module.exports = router