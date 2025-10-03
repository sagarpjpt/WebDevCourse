const mongoose = require('mongoose');

// Define the schema for a Todo item
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    description: {
        type: String,
        required: true,
        maxLength: 500,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Todo', todoSchema); // Export the model for use in other files and set collection name to todos as mongoose automatically pluralizes the model name