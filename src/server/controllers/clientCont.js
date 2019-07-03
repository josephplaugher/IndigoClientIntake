const express = require('express')
const NewClient = require('./model/user/NewClient')
const BuildQuote = require('./model/client/BuildQuote')

const routes = express.Router()

routes.post('/newClient', (req, res) => {
	const Client = new NewClient(req, res)
	Client.checkClient()
})

routes.post('/buildQuote', (req, res) => {
	const Quote = new BuildQuote(req, res)
	Quote.saveAndSend()
})

module.exports = routes
