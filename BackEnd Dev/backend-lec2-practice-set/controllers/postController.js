// import Post model here
const Post = require('../models/post');

// controller function to handle creating a new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    // create a new post document in the database
    const newPost = await Post.create({ title, content });
    // send a success response with the created post
    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    // handle errors and send an error response
    res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            data: posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message,
        });
    }
};