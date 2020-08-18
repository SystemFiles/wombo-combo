const multer = require('multer')
const { DATA_DIR } = require('../config')

// Configure
const storage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null, `${DATA_DIR}/uploads`)
	},
	filename    : (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.txt')
	}
})

const uploader = multer({ storage: storage })

module.exports = {
	uploader
}
