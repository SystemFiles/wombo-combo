const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { mainLimiter } = require('./middleware/rateLimiter')

// setup
const app = express()
const routes = require('./routes')

// configure
app.set('trust proxy', 1)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Add API-wide middleware
app.use(mainLimiter)

app.use('/wombo-combo/api', routes)

module.exports = {
	app
}
