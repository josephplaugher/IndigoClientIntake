const express = require('express')
const GetDecorList = require('./model/decor/GetDecorList')
const routes = express.Router()

routes.get('/getDecorList', GetDecorList)

module.exports = routes
