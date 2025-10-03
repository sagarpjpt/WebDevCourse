const express = require('express');
const router = express.Router(); // Create a router instance

// Import the controller function to handle creating a new Todo
const { createTodo } = require('../controllers/createTodo');

// Define a POST route to create a new Todo item
router.post('/createTodo', createTodo);

module.exports = router; // Export the router to be used in other files