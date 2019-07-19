const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')

const GetAllQuotes = (req, res) => {
	let Query = `SELECT id, itemId, clientID, email, event_type, total_cost
                FROM quotes WHERE header = 't'`
	Conn.query(Query)
		.catch((error) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('error getting quotes', error.stack)
				res.status(200).json({ userNotify: 'error retrieving all quotes' })
			} else {
				Log.error({ message: error.stack })
				res
					.status(200)
					.json({ userNotify: 'Something went wrong. Please try again' })
			}
		})
		.then((data) => {
			res.status(200).json({ quotes: data.rows })
		})
}

module.exports = GetAllQuotes
