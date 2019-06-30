const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')

const EditDecorItem = (req, res) => {
	console.log('edit item', req.body)
	let i = req.body
	let Query = {
		text: `UPDATE decor
				SET(item, price, category) =
				($1,$2,$3) 
				WHERE id = $4`,
		values: [i.item, i.price, i.category, i.id]
	}
	Conn.query(Query)
		.catch((error) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('error getting decor list: ', error.stack)
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
			res.status(200).json({ userNotfy: { message: 'Item Updated' } })
		})
}

module.exports = EditDecorItem
