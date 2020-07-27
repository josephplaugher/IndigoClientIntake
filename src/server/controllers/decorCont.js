const express = require('express')
const routes = express.Router()
const GetDecorList = require('./model/decor/GetDecorList')
const GetAllEventTypes = require('./model/eventTypes/GetAllEventTypes')
const AddNewEventType = require('./model/eventTypes/AddNewEventType')
const EditDecorItem = require('./model/decor/EditDecorItem')
const AddNewDecorItem = require('./model/decor/AddNewDecorItem')

routes.get('/docor/getDecorList', GetDecorList)
routes.get('/docor/getAllEventTypes', GetAllEventTypes)
routes.post('/docor/addNewEventType', AddNewEventType)
routes.post('/docor/editItem', EditDecorItem)
routes.post('/docor/addNewDecorItem', AddNewDecorItem)

module.exports = routes
