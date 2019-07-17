const express = require('express')
const NewClient = require('./model/user/NewClient')
const BuildQuote = require('./model/client/BuildQuote')
const GetQuoteByID = require('./model/client/GetQuoteByID')
const GetAllQuotes = require('./model/client/GetAllQuotes')

const routes = express.Router()

routes.post('/newClient', (req, res) => {
	const Client = new NewClient(req, res)
	Client.checkClient()
})

routes.post('/buildQuote', (req, res) => {
	const Quote = new BuildQuote(req, res)
	Quote.saveAndSend()
})

routes.get('/quoteID/:quoteID', GetQuoteByID)

routes.get('/getAllQuotes', GetAllQuotes)

module.exports = routes
