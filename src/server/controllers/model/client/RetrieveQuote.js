const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')

const RetrieveQuote = (req, res) => {
	console.log('quote id in req: ', req.param.quoteID)
	let i = req.param.quoteID
	let Query = {
		text: `SELECT id, itemId, clientID
                FROM quotes
				WHERE id = $1`,
		values: [i.quoteID]
	}
	Conn.query(Query)
		.catch((error) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('error retrieving quote: ', error.stack)
			} else {
				Log.error({ message: error.stack })
			}
			res.status(200).json({
				userNotfy: {
					error: 'Something went wrong. Try again in a few minutes'
				}
			})
		})
		.then((data) => {
			console.log('quote data: ', data)
			res.status(200).json({ userNotfy: { message: 'Item Updated' } })
		})
}

module.exports = RetrieveQuote
