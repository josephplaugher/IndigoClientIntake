const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')

const AddNewEventType = (req, res) => {
	console.log('edit item', req.body)
	let i = req.body
	let Query = {
		text: `INSERT INTO event_types
			event_type = $1`,
		values: [i.eventType]
	}
	Conn.query(Query)
		.catch((error) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('error adding event type: ', error.stack)
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
			//Log.Info({ message: req.headers })
			res
				.status(200)
				.json({
					userNotify: { success: true, message: 'New event type added' }
				})
		})
}

module.exports = AddNewEventType
