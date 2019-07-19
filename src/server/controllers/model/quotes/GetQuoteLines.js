const Conn = require('../../../util/Postgres')
const Log = require('../../../util/Log')
const Client = require('../user/UserBase')

class GetQuoteLines {
	constructor(req, res) {
		this.req = req
		this.res = res
	}

	async start() {
		// start by getting the item ids.
		let itemIds = await this.getItemIds()
		//then iterate through each itemId and get the detail
		var i = 0
		var itemDetailArray = []
		for (i = 0; i < itemIds.length; i++) {
			let itemDetail = await this.getItemDetails(itemIds[i].itemid)
			itemDetailArray.push(itemDetail)
		}
		let client = new Client(this.req, this.res)
		let clientData = await client.getCustomersByEmail(this.req.params.email)
		this.res.status(200).json({
			quoteLines: itemDetailArray,
			clientData: clientData.data[0].description
		})
	}

	getItemIds() {
		return new Promise((resolve, reject) => {
			let i = this.req.params
			let Query = {
				text: `SELECT itemId 
                FROM quotes
				WHERE id = $1 AND header is null`,
				values: [i.quoteID]
			}
			Conn.query(Query)
				.catch((error) => {
					if (process.env.NODE_ENV === 'development') {
						console.log('error retrieving quote: ', error.stack)
					} else {
						Log.error({ message: error.stack })
					}
					reject(error)
				})
				.then((data) => {
					resolve(data.rows)
				})
		})
	}

	getItemDetails(id) {
		return new Promise((resolve, reject) => {
			let Query = {
				text: `SELECT item, price, category, id 
                FROM decor
				WHERE id = $1`,
				values: [id]
			}
			Conn.query(Query)
				.catch((error) => {
					if (process.env.NODE_ENV === 'development') {
						console.log('error retrieving quote: ', error.stack)
					} else {
						Log.error({ message: error.stack })
					}
					reject(error)
				})
				.then((data) => {
					resolve(data.rows[0])
				})
		})
	}
}

module.exports = GetQuoteLines
