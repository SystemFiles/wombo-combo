const multer = require('multer');

// Configure
// const storage = multer.memoryStorage(); // Used for local memory storage (volatile for use-case)
const storage = multer.diskStorage({
	destination : (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename    : (req, file, cb) => {
		cb(null, file.fieldname + '-' + file.originalname);
	}
});

const uploader = multer({ storage: storage });

module.exports = {
	uploader
};
