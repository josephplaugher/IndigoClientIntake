const express = require('express')
const routes = express.Router()
const GetDecorList = require('./model/decor/GetDecorList')
const EditDecorItem = require('./model/decor/EditDecorItem')
const AddNewDecorItem = require('./model/decor/AddNewDecorItem')

routes.get('/getDecorList', GetDecorList)
routes.post('/editItem', EditDecorItem)
routes.post('/addNewDecorItem', AddNewDecorItem)

module.exports = routes
