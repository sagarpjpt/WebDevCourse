const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
    try {
        // fetch data from req body
        const {title, body} = req.body;

        // create a post document
        const post = await Post.create({title, body});

        // save the new post into db
        const savedPost = await post.save();
        
        res.status(201).json({message: "Post created successfully", post: savedPost});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("comments").populate("likes").exec(); // populate comments array with comment documents ie comment ids will be replaced by comment documents in posts object not in db

        res.status(200).json({posts});

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}