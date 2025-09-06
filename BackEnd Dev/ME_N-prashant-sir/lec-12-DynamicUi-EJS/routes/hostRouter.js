// core module
const path = require('path')

const express = require('express');
const rootDir = require('../utils/pathUtil')

const hostRouter = express.Router();

hostRouter.get('/add-home', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'addhome.html'))
})

const registeredHomes = [];

hostRouter.post('/add-home', (req, res, next) => {
    console.log(req.body, req.body.houseName)
    registeredHomes.push({houseName: req.body.houseName});
    res.sendFile(path.join(rootDir, 'views', 'homeadded.html'))
})

// module.exports = hostRouter;

// now we have multiple var to exports

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;