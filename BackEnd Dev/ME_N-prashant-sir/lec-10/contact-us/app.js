// 
const path = require('path')

// external module
const express = require('express')

// local moodules
const homeRouter = require('./routes/homeRouter')
const contactRouter = require('./routes/contactRouter')

const rootDir = require('./utils/pathUtil')

const app = express()

app.use(express.urlencoded()) // helps to parse body of request from client

app.use(homeRouter)
app.use(contactRouter)

app.use((req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'))
})

const PORT = 3000
app.listen(PORT, () =>{
    console.log(`server running on address http://localhost:${PORT}`)
})