const express = require('express'); // Import express to create the server

const app = express(); // Create an express application instance

// load environment variables from .env file
require('dotenv').config();

// middleware to parse JSON request bodies sent by clients
app.use(express.json());

// imports routes defined in routes/todos.js
const todoRoutes = require('./routes/todos');

// default route to check if server is running
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Todo API</h1>');
});

// mount the todo routes at /api/v1
app.use('/api/v1', todoRoutes);

// start the server and listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// connect to the database
const dbConnect = require('./config/database');
dbConnect();