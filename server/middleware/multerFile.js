const multer = require('multer')

// Configure
const storage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename    : (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.txt')
	}
})

const uploader = multer({ storage: storage })

module.exports = {
	uploader
}
