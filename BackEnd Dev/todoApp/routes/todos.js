const express = require('express');
const router = express.Router(); // Create a router instance

// Import the controller functions for handling Todo operations
const { createTodo } = require('../controllers/createTodo');
const { getTodos, getTodoById } = require('../controllers/getTodo');
const { updateTodo } = require('../controllers/updateTodo');
const { deleteTodo } = require('../controllers/deleteTodo');

// -------------API Routes for Todo operations------------------
// Define a POST route to create a new Todo item
router.post('/createTodo', createTodo);
// Define a GET route to retrieve all Todo items
router.get('/getTodos', getTodos); 
// Route to GET a single Todo by ID
router.get('/getTodos/:id', getTodoById); 
// Define a PUT route to update an existing Todo item by ID
router.put('/updateTodo/:id', updateTodo);
// Route to delete a Todo by ID
router.delete('/deleteTodo/:id', deleteTodo);

module.exports = router; // Export the router to be used in other files