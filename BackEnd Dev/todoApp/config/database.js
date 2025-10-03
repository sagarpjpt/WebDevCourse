const mongoose = require('mongoose'); // Import mongoose to handle MongoDB connection

require('dotenv').config(); // Load environment variables from .env file

// Function to connect to MongoDB using Mongoose
const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process with failure
    });
}

module.exports = dbConnect; // Export the connection function for use in other files