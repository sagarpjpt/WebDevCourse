// import mongoose
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post", // reference to post model
        required:true
    },
    user: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Comment', commentSchema); // collection name will be comments because mongoose automatically pluralizes the model name