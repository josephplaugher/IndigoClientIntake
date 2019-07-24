const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')

const AddNewDecorItem = (req, res) => {
	console.log('edit item', req.body)
	let i = req.body
	let Query = {
		text: `INSERT INTO decor
				(item, price, category, image) VALUES
				($1,$2,$3,$4)`,
		values: [i.item, i.price, i.category, i.image]
	}
	Conn.query(Query)
		.catch((error) => {
			if (process.env.NODE_ENV === 'development') {
				console.log('error adding decor item: ', error.stack)
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
				.json({ userNotify: { success: true, message: 'new item added' } })
		})
}

module.exports = AddNewDecorItem
