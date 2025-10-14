// app create
const express = require('express')
const app = express()

// PORT find karna h
require('dotenv').config()
const PORT = process.env.PORT || 3000;

// middleware add
app.use(express.json())
const fileupload = require('express-fileupload')
app.use(
  fileupload({
    useTempFiles: true,          // <– THIS enables tempFilePath
    tempFileDir: "/tmp/",        // temporary storage folder
  })
);

// db se connect
const {connectDB} = require('./configs/database')
connectDB();

// cloudinary se connect
const {cloudinaryConnect} = require('./configs/cloudinary')
cloudinaryConnect();

// api route mount karna h
const upload = require('./routes/fileUpload')
app.use("/api/v1/upload", upload)

// default route
app.use('/', (req, res) => {
    res.send("<h1>welcome to file upload api</h1>")
})

// activate server
app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`);
})