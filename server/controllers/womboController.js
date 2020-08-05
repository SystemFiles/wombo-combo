const path = require('path')
const fs = require('fs-extra')
const { upload } = require('../services/womboService')
const { response } = require('express')

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
		.then(async (resp) => {
			try {
				await Promise.all([
					fs.remove(`${appDir}/uploads/${resp.userFileName}`),
					fs.remove(`${appDir}/uploads/${resp.passFileName}`)
				])

				res.status(200).send(JSON.stringify({ fileID: resp.fileID }))
			} catch (err) {
				console.log(err)
				res.status(500).send({ message: 'Failed to remove uploads.' })
			}
		})
		.catch((err) => {
			res.status(500).send(err) && next(err)
		})
}

const getComboFile = async (req, res) => {
	const fileID = req.query.fileID
	try {
		res.sendFile(`exports/combo-list-${fileID}.txt`, { root: appDir })

		// Remove combo-list from storage
		await fs.remove(`${appDir}/exports/combo-list-${fileID}.txt`)
	} catch (err) {
		console.log(`ERROR: Problem sending and removing combo-list from storage... ${err}`)
		res.status(500).send({ message: 'Failed to remove/send combo-list file.' })
	}
}

module.exports = {
	uploadFile,
	getComboFile
}
