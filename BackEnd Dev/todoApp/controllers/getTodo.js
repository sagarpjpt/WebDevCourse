// import Todo model
const Todo = require('../models/Todo');

// Controller function to get all Todo items
exports.getTodos = async (req, res) => {
    try {
        // Fetch all Todo items from the database
        const todos = await Todo.find();
        // Send a json response with the list of todos to client
        res.status(200).json({ 
            message: 'Todos Retrieved', 
            todos 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error',
            error: error.message 
        });
    }
}

// Controller function to get a single Todo item by ID
exports.getTodoById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from request parameters
        // Fetch the Todo item by ID from the database
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo Not Found' });
        }
        // Send a json response with the found todo item to client
        res.status(200).json({ 
            message: 'Todo Retrieved', 
            todo 
        });
    }
    catch (error) {
        res.status(500).json({ 
            message: 'Server Error',
            error: error.message 
        });
    }   
}