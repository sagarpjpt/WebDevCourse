const express = require("express");
const app = express();
require("dotenv").config();

// middleware to parse JSON request bodies
app.use(express.json());

// import routes
const blog = require("./routes/blog");

// mount routes
app.use("/api/v1", blog);

const connectDB = require("./config/database");
connectDB(); // connect to database

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on localhost:" + port);
});

// define a simple route
app.get("/", (req, res) => {
  res.send("connected to server");
});