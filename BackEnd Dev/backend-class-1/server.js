// step 1 : create folder ---> backend-class-1
// step 2 : move into that folder and open terminal at this path
// step 3 : npm init -y
// step 4 : npm i express
// step 5 : create server.js
// step 6 : after activating the server on port number ---> $ node server.js

// server instantiate
const express = require('express');
const app = express();

// used to parse req.body in express ---> specially used in case of PUT and POST
const bodyParser = require('body-parser');

// specifically parse JSON data and add it to the request.Body object
app.use(bodyParser.json());

// activate the server on 3000 port .listen(port no, callback_fn)
app.listen(3000, () => {
    console.log('Server Started at port no. 3000')
})

// our Routes ----> 

// when path '/' hit then a get request is sent and respective callback fn executed
app.get('/', (request, response) =>{
    response.send('missing you iram :( '); // we can see this response at localhost:3000/
})

// when path '/api/cars' hit then a post request is sent to server respective callback fn executed which 
app.post('/api/cars', (request, response) => {
    const {name, brand} = request.body;
    console.log(name)
    console.log(brand)
    response.send("car submitted succesfully") // this response is sent to postman from where we made a post call
    // we can not see this response at localhost:3000/api/cars --> Cannot GET /api/cars
    // as this response will be displayed in postman app from where you sent the data---> name and brand at url /api/cars
    // and if successfully recieved here u will get both console here
})
// how to verify post request ---> using postman ---> it used for api designing , testing etc ... its a collaboration tool