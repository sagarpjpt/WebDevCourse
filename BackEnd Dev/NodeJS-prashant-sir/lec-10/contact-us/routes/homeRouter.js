const path = require('path')

const express = require('express')

const rootDir = require('../utils/pathUtil')

const homeRouter = express.Router();

homeRouter.get('/', (req, res, next) => {
    console.log('handling / for get ', req.url, req.method)
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
})

module.exports = homeRouter