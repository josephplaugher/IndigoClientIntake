const SetStripeKey = require('../SetStripeKey.js')
const NewClient = require('./../user/NewClient')
const uuid = require('uuid/v4') // general use random id
const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')
const SendEmail = require('./../../../util/SendEmail')

class BuildQuote {
	constructor(req, res) {
		this.req = req
		this.res = res
		this.quoteId = ''
	}

	async saveAndSend() {
		// first check stripe to see if this is a new or existing client.
		// create the client is they're new
		// and just retrieve their info if they're not new.
		let Client = new NewClient(this.req, this.res)
		let doesUserExist = await Client.getCustomersByEmail()
		var CurrentClient
		if (doesUserExist.data[0]) {
			CurrentClient = doesUserExist.data[0]
		} else {
			let password = await Client.passwordHash('password')
			CurrentClient = await Client.createClient(password)
		}
		// generate a quote id
		this.quoteId = uuid()
		//create the header row that contains generate quote info
		let header = await this.enterQuoteHeader(CurrentClient)
		// place the selection by id into a new array for iteration below
		let itemIds = this.req.body.selections
		let i = 0
		for (i = 0; i < itemIds.length; i++) {
			let inserted = await this.enterQuoteRow(itemIds[i])
		}
		if (this.req.body.saveForLater) {
			this.res.status(200).json({
				userNotfy: { message: 'The quote has been saved.' }
			})
		} else {
			this.sendQuote()
		}
	}

	enterQuoteHeader(Client) {
		return new Promise((resolve, reject) => {
			let i = this.req.body
			let Query = {
				text: `INSERT INTO quotes
                        (id, event_type, clientID, email, total_cost, header)
                        VALUES ($1,$2,$3,$4,$5, 'true')`,
				values: [this.quoteId, i.eventType, Client.id, i.email, i.total]
			}
			Conn.query(Query)
				.catch((error) => {
					if (process.env.NODE_ENV === 'development') {
						console.log('error saving quote: ', error.stack)
					} else {
						Log.error({ message: error.stack })
					}
					reject(error)
				})
				.then((data) => {
					//Log.Info({ message: req.headers })
					resolve(data)
				})
		})
	}

	enterQuoteRow(itemId) {
		return new Promise((resolve, reject) => {
			let Query = {
				text: `INSERT INTO quotes
                        (id, itemId)
                        VALUES ($1,$2)`,
				values: [this.quoteId, itemId]
			}
			Conn.query(Query)
				.catch((error) => {
					if (process.env.NODE_ENV === 'development') {
						console.log('error saving quote: ', error.stack)
					} else {
						Log.error({ message: error.stack })
					}
					reject(error)
				})
				.then((data) => {
					//Log.Info({ message: req.headers })
					resolve(data)
				})
		})
	}

	sendQuote() {
		let quoteURL
		if (process.env.NODE_ENV === 'production') {
			quoteURL = process.env.QUOTEURL_PROD
		} else {
			quoteURL = process.env.QUOTEURL_DEV
		}
		let body = `Hello ${this.req.body.fname}, <br/>
					Click <a href=${quoteURL}/quoteID/${this.quoteId}>here</a>
					to view and customize your quote.
					<br/>
					<br/>
					Thanks!`
		const Mail = new SendEmail(
			this.req,
			this.res,
			this.req.body.email, // the client email from the api request
			'Quote #' + this.quoteId, // the quote id
			body //the email body as defined above
		)
		let result = Mail.send()
		this.res.status(200).json({
			userNotfy: { message: result }
		})
	}
}

module.exports = BuildQuote
