const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')

class LiveSearch {
	constructor(req, res) {
		this.req = req
		this.res = res
		this.name = req.params.name
		this.val = req.params.value
		this.setQuery(this.name)
	}

	setQuery(name) {
		var query
		switch (name) {
			case 'category':
				query =
					'SELECT category FROM decor WHERE LOWER(category) LIKE LOWER($1) GROUP BY category ORDER BY category ASC LIMIT 5'
				break

			default:
				query = 'no match'
				break
		}
		this.query = query
	}

	runQuery() {
		const Connection = Conn //(req.headers['dbconn']); //db connection
		Connection.connect() //activate the connection

		const param = '%' + this.val + '%'
		const query = {
			text: this.query,
			values: [param]
		}
		Connection.query(query)
			.catch((error) => console.error(error.message))
			.then((data) => {
				if (data.rows[0]) {
					this.res.status(200).json({ lsrResult: data.rows })
				}
				if (!data.rows[0]) {
					this.res.status(200).json({ nr: 'Nothing found' })
				}
			})
	}
}

module.exports = LiveSearch
