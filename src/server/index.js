const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cookieParser = require('cookie-parser')
const SetUrl = require('./util/SetUrl.js')
const Auth = require('./util/Auth.js')
const userCont = require('./controllers/userCont.js')
const clientCont = require('./controllers/clientCont.js')
const achCont = require('./controllers/achCont.js')
const ccCont = require('./controllers/ccCont.js')
const decorCont = require('./controllers/decorCont.js')
const liveSearchCont = require('./controllers/liveSearchCont.js')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', './src/views')

let port = process.env.PORT
app.listen(port, function() {
	console.log(
		'server started in ' + process.env.NODE_ENV + ' mode on port ' + port
	)
})

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', SetUrl())
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, authorization')
	res.set('X-Powered-By', 'Appreciate Corporation')
	next()
})

app.use(bodyParser.urlencoded({ extended: false })) // Parse application/x-www-form-urlencoded
app.use(cookieParser())
app.use(bodyParser.json()) // Parse application/json

const checkAuth = (req, res, next) => {
	let auth = new Auth(req, res, next)
	return auth
}

app.get('/checkLoginState', checkAuth, (req, res) => {
	console.log('server: checking login state')
	res.status(200).json({ checkLoginState: 'done' })
})

app.use('/', userCont)
// app.use('/', checkAuth, clientCont)
app.use('/', checkAuth, decorCont)
// app.use('/', checkAuth, achCont)
// app.use('/', checkAuth, ccCont)
// app.use('/', checkAuth, liveSearchCont)

//this route renders the UI. The UI will check for the cookie and token
//and log the user out if they don't exist.
app.all('/*', (req, res) => {
	res.render('index')
})
