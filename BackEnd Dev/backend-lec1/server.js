// SERVER INSTATIATION
const express = require('express'); // import express module
const app = express(); // created instance of express named app

// step 8 need body parser to parse json data at server sent by client to server
app.use(express.json()); // built in body parser of express to parse json data

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); // server listening on port 3000 and ip localhost(127.0.0.1)



// -------------------ROUTES------------------
app.get('/', (req, res) => {
    res.send("Hello World from Express");
}); // handling get request sended to server by client when he visits localhost:3000/

app.post('/api/cars', (req, res) => {
    const name = req.body.name // data sent by client to server
    const brand = req.body.brand // data sent by client to server
    console.log(name,brand); // printing data sent by client to server on server console
    res.send("This is a post request at /api/cars endpoint");
}); // handling post request(ie client want to save data on server) sended to server by client when he visits localhost:3000/api/cars



// -------------------CONNECTING TO MONGODB------------------
const mongoose = require('mongoose'); // import mongoose module

mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("connnection succesfull"))
.catch(err => console.log("recieved an error")) // connecting to mongodb server at port 27017 and database name is myDatabase