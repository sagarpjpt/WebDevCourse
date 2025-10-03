// import the Todo model
const Todo = require('../models/Todo');

// Controller function to create a new Todo item
exports.createTodo = async (req, res) => {
    try {
        
        // Extract title and description from the request body
        const { title, description } = req.body;
        
        // Create a new Todo instance
        const newTodo = new Todo({
            title,
            description,
        });
        
        // Save the new Todo to the database
        const savedTodo = await newTodo.save();
        
        // send a json response with the saved todo item to client
        res.status(201).json({ 
            message: 'Todo Created', todo: savedTodo 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
}