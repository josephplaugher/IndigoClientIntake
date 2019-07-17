const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')

class GetAllQuotes {
	constructor(req, res) {
		this.req = req
		this.res = res
	}

	async get() {
		let quoteLines = await this.getQuoteLines()
		this.res.status(200).json({ quotes: quoteLines })
	}

	getQuoteLines() {
		return new Promise((resolve, reject) => {
			let Query = `SELECT id, itemId, clientID
                FROM quotes`
			Conn.query(Query)
				.catch((error) => {
					if (process.env.NODE_ENV === 'development') {
						reject('error retrieving all quotes: ', error.stack)
					} else {
						reject(Log.error({ message: error.stack }))
					}
				})
				.then((data) => {
					resolve(data.rows)
				})
		})
	}
}

module.exports = GetAllQuotes
