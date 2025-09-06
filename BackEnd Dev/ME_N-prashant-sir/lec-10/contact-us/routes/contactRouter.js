const path = require('path')

const express = require('express')

const rootDir = require('../utils/pathUtil')

const contactRouter = express.Router();

contactRouter.get('/contact-us', (req, res, next) => {
    console.log('handling / for get', req.url, req.method)
    res.sendFile(path.join(rootDir, 'views', 'contact-us.html'))
})

contactRouter.post('/contact-us', (req, res, next) => {
    console.log('handling /contact-us for post', req.url, req.method, req.body)
    // console.log(req.body)
    res.sendFile(path.join(rootDir, 'views', 'contact-success.html'))
})

module.exports = contactRouter