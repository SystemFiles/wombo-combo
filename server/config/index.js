const dotenv = require('dotenv')
dotenv.config()

module.exports = {
	PORT     : process.env.PORT || 5000,
	DATA_DIR : process.env.DATA_DIR || '/data'
}
