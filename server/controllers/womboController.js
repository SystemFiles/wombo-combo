const { upload } = require('../services/womboService');

const uploadFile = async (req, res, next) => {
	const files = req.files;

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
