const SetStripeKey = require('../SetStripeKey.js')
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
		this.quoteId = uuid()
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

	enterQuoteRow(itemId) {
		return new Promise((resolve, reject) => {
			let Query = {
				text: `INSERT INTO quotes
                        (id, itemId, clientID)
                        VALUES ($1,$2,$3)`,
				values: [this.quoteId, itemId, this.req.body.email]
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
		Mail.send()
	}
}

module.exports = BuildQuote
