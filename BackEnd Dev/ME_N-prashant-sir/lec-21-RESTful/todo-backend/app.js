const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${ENV}`,
});

// External Module
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

// local module
const errorController = require("./controllers/error");
const todoItemsRouter = require("./routes/todoItemsRouter");

const DB_PATH =
  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@clusterairbnb.2vv7oxe.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=ClusterAirbnb`;


const app = express();

app.use(express.urlencoded());
app.use(cors())
app.use(express.json())

app.use("/api/todo", todoItemsRouter)

app.use(errorController.get404);

const PORT = 3000;

// first mongo connect then server will start
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("error while connecting to mongoDB", err));
