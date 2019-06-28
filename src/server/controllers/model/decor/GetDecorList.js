const Conn = require('./../../../util/Postgres')
const Log = require('./../../../util/Log')

const GetDecorList = (req, res) => {
	console.log('getting decor list')
	Conn.query('SELECT item, price, category FROM decor')
		.then((data) => {
			// console.log('decor list in db', data.rows)
			//Log.Info({ message: req.headers })
			res.status(200).json({ list: data.rows })
		})
		.catch((error) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('error getting decor list: ', error.stack)
			} else {
				// Log.error({ message: error.stack })
			}
		})
}

module.exports = GetDecorList
