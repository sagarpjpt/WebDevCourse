// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// create a comment for a postId

exports.createComment = async (req, res) => {
    try {
        // fetch data from req body
        const {postId, user, body} = req.body;

        // create a comment document
        const comment = await Comment.create({postId, user, body});

        // save the new comment into db
        const savedComment = await comment.save();

        // find post by id, add the new comment to the comments array and save the postId
        const updatedPost = await Post.findByIdAndUpdate(postId, {$push: {comments: savedComment._id}}, {new: true}).populate("comments").exec(); // populate comments array with comment documents ie comment ids will be replaced by comment documents in updatedPost object not in db

        res.status(201).json({message: "Comment created successfully", post: updatedPost});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}