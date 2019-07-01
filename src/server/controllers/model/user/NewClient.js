const jwt = require('jsonwebtoken')
const SetStripeKey = require('../SetStripeKey.js')
const UserBase = require('./UserBase.js')

class NewClient extends UserBase {
	constructor(req, res) {
		super()
		this.req = req
		this.res = res
	}

	async checkClient() {
		let doesUserExist = await this.getCustomersByEmail()
		if (doesUserExist.data[0]) {
			this.res.status(200).json({
				userNotify: {
					error: `It looks like this client already exists.`
				},
				userData: {}
			})
		} else {
			let password = await this.passwordHash('password')
			let newUser = await this.createClient(password)
			if (newUser) {
				this.res.status(200).json({
					userNotify: {
						message: `You've add a new client.`
					},
					userData: {}
				})
			}
		}
	}

	createClient(password) {
		let newCustomer = new Promise((resolve, reject) => {
			let i = this.req.body
			this.stripe.customers.create(
				{
					email: i.email,
					description: JSON.stringify({
						fname: i.fname,
						lname: i.lname,
						password: password
					})
				},
				(error, customer) => {
					console.log('create user error: ', error)
					if (error) {
						reject(error)
					} else {
						resolve(customer)
					}
				}
			)
		})
		return newCustomer
	}
}

module.exports = NewClient
