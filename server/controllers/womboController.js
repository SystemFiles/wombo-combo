const path = require('path')
const { upload } = require('../services/womboService')

const appDir = path.dirname(require.main.filename)
const MAX_SIZE_MB = 5

const uploadFile = async (req, res, next) => {
	const files = req.files

	if (!files || files[0].size + files[1].size > 1024 * 1024 * MAX_SIZE_MB) {
		const error = new Error(`Please select files that have a maximum file size of ${MAX_SIZE_MB}MB...`)
		error.httpStatusCode = 400
		return next(error)
	}

	upload(files)
		.then((fileID) => {
			res.status(200).send(
				JSON.stringify({
					fileID : fileID
				})
			)
		})
		.catch((err) => {
			res.status(500).send(err) && next(err)
		})
}

const getComboFile = async (req, res) => {
	const fileID = req.query.fileID
	console.log(`Sending file with fileID: ${fileID}`)

	await res.sendFile(`exports/combo-list-${fileID}.txt`, { root: appDir })
}

module.exports = {
	uploadFile,
	getComboFile
}
