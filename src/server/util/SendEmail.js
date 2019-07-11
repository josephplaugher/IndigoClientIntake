const nodemailer = require('nodemailer')
const Log = require('./Log')

class SendEmail {
	constructor(req, res, recipient, subject, body) {
		this.req = req
		this.res = res
		this.recipient = recipient
		this.subject = subject
		this.body = body
	}

	send() {
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			secure: false, // true for 465, false for other ports
			auth: {
				user: process.env.ADMIN_EMAIL,
				pass: process.env.EMAIL_PASSWORD
			}
		})
		// setup email data with unicode symbols
		let From = `${process.env.FROM_NAME} <${process.env.ADMIN_EMAIL}>`
		let mailOptions = {
			from: From, // sender address
			to: this.recipient, // list of receivers
			bcc: 'joseph@appreciateco.com',
			subject: this.subject, // Subject line
			html: this.body // html body
		}
		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(error)
				Log.error({ message: error.stack })
				this.res.status(200).json({
					userNotfy: {
						error: 'Something went wrong, try again in a few minutes'
					}
				})
			} else {
				console.log('sent email data: ', info)
				this.res.status(200).json({
					userNotfy: { message: 'The quote has been sent to the client' }
				})
			}
		})
	}
}

module.exports = SendEmail
