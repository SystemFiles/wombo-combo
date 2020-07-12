const path = require('path');
const { upload } = require('../services/womboService');

const appDir = path.dirname(require.main.filename);
const MAX_SIZE_MB = 5;

const uploadFile = async (req, res, next) => {
	const files = req.files;

	if (!files || files[0].size + files[1] > 1024 * 1024 * MAX_SIZE_MB) {
		const error = new Error(`Please select files that have a maximum file size of ${MAX_SIZE_MB}MB...`);
		error.httpStatusCode = 400;
		return next(error);
	}

	upload(files)
		.then((path) => {
			console.log(appDir + '/' + path);
			res.status(200).sendFile(path, { root: '../server' });
		})
		.catch((err) => {
			res.status(500).send(err) && next(err);
		});
};

module.exports = {
	uploadFile
};
