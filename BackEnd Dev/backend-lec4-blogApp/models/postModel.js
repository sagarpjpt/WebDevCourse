// import mongoose
const mongoose = require('mongoose');

// define the Post schema
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like" // reference to like model
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment" // reference to comment model
    }]
})

// export the model
module.exports = mongoose.model('Post', postSchema); // collection name will be posts because mongoose automatically pluralizes the model name