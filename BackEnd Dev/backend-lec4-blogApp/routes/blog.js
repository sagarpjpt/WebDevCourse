const express = require("express");
const router = express.Router();

// import controller functions
const {createComment} = require("../controllers/commentController");
const {createPost, getAllPosts} = require("../controllers/postController");
const {likePost, unlikePost} = require("../controllers/likeController");


// mapping routes to controller functions
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);

// mapping routes to controller functions
router.post("/comments/create", createComment);

// mapping routes to controller functions
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

// export the router
module.exports = router;