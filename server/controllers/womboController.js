const { upload } = require('../services/womboService');
const MAX_SIZE_MB = 5;

const uploadFile = async (req, res, next) => {
	const files = req.files;

	if (!files || files[0].size + files[1] > 1024 * 1024 * MAX_SIZE_MB) {
		const error = new Error(`Please select files that have a maximum file size of ${MAX_SIZE_MB}MB...`);
		error.httpStatusCode = 400;
		return next(error);
	}

	upload(files)
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send(err) && next(err);
		});
};

module.exports = {
	uploadFile
};
