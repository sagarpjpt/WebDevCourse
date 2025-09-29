const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    date: Date,
    completed: {
        type: Boolean,
        default: false
    },
    timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TodoItem', todoItemSchema); // 'TodoItem' is the name of the collection in MongoDB as todoitems
// Mongoose automatically pluralizes the model name to create the collection name.