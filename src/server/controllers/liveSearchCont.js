const express = require('express')
const routes = express.Router()
const LiveSearch = require('./model/liveSearch/LiveSearch')

routes.get('/liveSearch/name/:name/value/:value', (req, res) => {
	let LS = new LiveSearch(req, res)
	LS.runQuery()
})

module.exports = routes
