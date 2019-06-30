const Conn = require('./../../../util/Postgres')
const Log = require('./../../../util/Log')

const GetDecorList = (req, res) => {
	Conn.query('SELECT id, item, price, category FROM decor ORDER BY id ASC')
		.catch((error) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('error getting decor list: ', error.stack)
			} else {
				Log.error({ message: error.stack })
			}
		})
		.then((data) => {
			//Log.Info({ message: req.headers })
			res.status(200).json({ list: data.rows })
		})
}

module.exports = GetDecorList
