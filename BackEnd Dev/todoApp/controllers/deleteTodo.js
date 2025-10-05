// import Todo model
const Todo = require('../models/Todo');

// Controller function to delete a Todo by ID
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from request parameters
        const deletedTodo = await Todo.findByIdAndDelete(id); // Find and delete the Todo by ID

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' }); // If no Todo found, send 404 response
        } 
        res.status(200).json({ message: 'Todo deleted successfully', deletedTodo }); // Send success response with deleted Todo
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message }); // Handle server errors
    }
};