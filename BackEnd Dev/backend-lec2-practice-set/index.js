const express = require('express'); // Import express to create the server

const app = express(); // Create an express application instance

// load environment variables from .env file
require('dotenv').config();

// middleware to parse JSON request bodies sent by clients
app.use(express.json());

// imports routes defined in routes/
const blogRouter = require('./routes/blogRouter');

// default route to check if server is running
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Blog Post api</h1>');
});

// mount the todo routes at /api/v1
app.use('/api/v1', blogRouter);

// start the server and listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// connect to the database
const dbConnect = require('./config/database');
dbConnect();