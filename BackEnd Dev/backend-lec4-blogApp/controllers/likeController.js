// imports models
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// create a like for a postId

exports.likePost = async (req, res) => {
    try {
        // fetch data from req body
        const {postId, user} = req.body;

        // create a like document
        const like = await Like.create({postId, user});

        // save the new like into db
        const savedLike = await like.save();

        // find post by id, add the new like to the likes array and save the postId
        const updatedPost = await Post.findByIdAndUpdate(postId, {$push: {likes: savedLike._id}}, {new: true}).populate("likes").exec(); // populate likes array with like documents ie like ids will be replaced by like documents in updatedPost object not in db
        res.status(201).json({message: "Like created successfully", post: updatedPost});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

// unlike the post
exports.unlikePost = async (req, res) => {
    try{
        const {postId, likeId} = req.body;
        
        // delete the like document from Like collection
        await Like.findByIdAndDelete(likeId);

        // find post by id, remove the like from the likes array
        const updatedPost = await Post.findByIdAndUpdate(postId, {$pull: {likes: likeId}}, {new: true}).populate("likes").exec(); // populate likes array with like documents ie like ids will be replaced by like documents in updatedPost object not in db

        // sending response 
        res.status(201).json({message: "Like removed successfully", post: updatedPost});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}