const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());

// route imports and mount
const user = require('./routes/user');
app.use('/api/v1', user);

// default route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Auth System</h1>');
});

const { connectDB } = require('./config/database');
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});