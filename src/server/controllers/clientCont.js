const express = require('express')
const NewClient = require('./model/user/NewClient')
const BuildQuote = require('./model/quotes/BuildQuote')
const GetAllQuotes = require('./model/quotes/GetAllQuotes')
const GetQuoteByID = require('./model/quotes/GetQuoteByID')
const GetQuoteLines = require('./model/quotes/GetQuoteLines')

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

routes.get('/getQuoteLines/id/:quoteID/email/:email', (req, res) => {
	let QuoteLines = new GetQuoteLines(req, res)
	QuoteLines.start()
})

routes.get('/getAllQuotes', GetAllQuotes)

module.exports = routes
