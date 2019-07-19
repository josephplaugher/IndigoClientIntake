const SetStripeKey = require('./../SetStripeKey.js')
const bcryptjs = require('bcryptjs')

class UserBase {
	constructor(req, res) {
		this.stripe = SetStripeKey()
		this.req = req
		this.res = res
	}

	getCustomersByEmail(email) {
		let customer = new Promise((resolve, reject) => {
			this.stripe.customers.list(
				// if this is a post request, we'll use the post body
				// if not, we pipe in the email from the get body
				{ email: this.req.body.email || email },
				(error, customers) => {
					if (error) {
						reject(error)
					} else {
						resolve(customers)
					}
				}
			)
		})
		return customer
	}

	buildUserObject(u) {
		let userData = JSON.parse(u.description)
		userData['id'] = u.id
		userData['default_source'] = u.default_source
		userData['email'] = u.email
		userData['sources'] = u.sources
		return userData
	}

	passwordHash(input) {
		return new Promise((resolve, reject) => {
			bcryptjs.hash(input, 14, (error, hashed) => {
				if (error) {
					console.log('password hash error: ', error)
					reject(error)
				} else {
					resolve(hashed)
				}
			})
		})
	}
}

module.exports = UserBase
