// import mongoose
const mongoose = require('mongoose');

// define the like schema
const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post", // reference to post model
        required:true
    },
    user: {
        type: String,
        required: true
    }
})

// export the model
module.exports = mongoose.model('Like', likeSchema); // collection name will be likes because mongoose automatically pluralizes the model name