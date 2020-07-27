const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')

const GetAllEventTypes = (req, res) => {
	console.log('get event types')
	Conn.query('SELECT id, event_type FROM event_types ORDER BY event_type ASC')
		.catch((error) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('error getting event_types list: ', error.stack)
			} else {
				Log.error({ message: error.stack })
			}
		})
		.then((data) => {
			//Log.Info({ message: req.headers })
			console.log('sql running')
			console.log('data: ', data.rows)
			res.status(200).json({ list: data.rows })
		})
}

module.exports = GetAllEventTypes
