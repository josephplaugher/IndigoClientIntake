const express = require('express')
const NewClient = require('./model/user/NewClient')

const routes = express.Router()

routes.post('/newClient', (req, res) => {
	const Client = new NewClient(req, res)
	Client.checkClient()
})

module.exports = routes
