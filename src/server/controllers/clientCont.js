const express = require('express')
const NewClient = require('./model/user/NewClient')
const BuildQuote = require('./model/quotes/BuildQuote')
const GetAllQuotes = require('./model/quotes/GetAllQuotes')
const GetQuoteByID = require('./model/quotes/GetQuoteByID')
const GetQuoteLines = require('./model/quotes/GetQuoteLines')

const routes = express.Router()

routes.post('/client/newClient', (req, res) => {
	const Client = new NewClient(req, res)
	Client.checkClient()
})

routes.post('/client/buildQuote', (req, res) => {
	const Quote = new BuildQuote(req, res)
	Quote.saveAndSend()
})

routes.get('/client/quoteID/:quoteID', GetQuoteByID)

routes.get('/client/getQuoteLines/id/:quoteID/email/:email', (req, res) => {
	let QuoteLines = new GetQuoteLines(req, res)
	QuoteLines.start()
})

routes.get('/client/getAllQuotes', GetAllQuotes)

module.exports = routes
