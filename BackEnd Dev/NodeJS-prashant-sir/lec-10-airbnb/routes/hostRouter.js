// core module
const path = require('path')

const express = require('express');
const rootDir = require('../utils/pathUtil')

const hostRouter = express.Router();

hostRouter.get('/add-home', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'addhome.html'))
})

hostRouter.post('/add-home', (req, res, next) => {
    console.log(req.body)
    res.sendFile(path.join(rootDir, 'views', 'homeadded.html'))
})

module.exports = hostRouter;