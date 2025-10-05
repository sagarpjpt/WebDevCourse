// import todo model
const Todo = require("../models/Todo");

// Controller function to update a Todo item by ID
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from request parameters
    const { title, description } = req.body; // Extract updated fields from request body

    // Find the Todo item by ID and update it with new data
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, updatedAt: Date.now() },
      { new: true } // Return the updated document
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }
    // Send a json response with the updated todo item to client
    res.status(200).json({
      message: "Todo Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
