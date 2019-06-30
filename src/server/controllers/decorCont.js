const express = require('express')
const GetDecorList = require('./model/decor/GetDecorList')
const EditDecorItem = require('./model/decor/EditDecorItem')
const routes = express.Router()

routes.get('/getDecorList', GetDecorList)
routes.post('/editItem', EditDecorItem)

module.exports = routes
