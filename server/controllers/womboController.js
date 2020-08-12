const path = require('path')
const fs = require('fs-extra')
const { upload } = require('../services/womboService')

const appDir = path.dirname(require.main.filename)
const MAX_SIZE_MB = 50

const uploadFile = async (req, res) => {
	const files = req.files
	const vars = typeof req.query === 'string' || req.query instanceof String ? JSON.parse(req.query.vars) : req.query

	if (!files || files[0].size + files[1].size > 1024 * 1024 * MAX_SIZE_MB) {
		const error = new Error(`Please select files that have a maximum file size of ${MAX_SIZE_MB}MB...`)
		console.log(`ERROR: ${error.message}`)
		res.send({ status: 500, message: error.message })

		// Remove files
		await Promise.all([
			fs.remove(`${appDir}/uploads/${files[0].filename}`),
			fs.remove(`${appDir}/uploads/${files[1].filename}`)
		])
	} else {
		try {
			let resp = await upload(files, vars)
			res.status(200).send(JSON.stringify({ fileID: resp.fileID }))
		} catch (err) {
			res.send({ status: 500, message: `${err}` })
		} finally {
			await Promise.all([
				fs.remove(`${appDir}/uploads/${resp.userFileName}`),
				fs.remove(`${appDir}/uploads/${resp.passFileName}`)
			])
		}
	}
}

const getComboFile = async (req, res) => {
	const fileID = req.query.fileID
	try {
		res.sendFile(`exports/combo-list-${fileID}.txt`, { root: appDir })
	} catch (err) {
		console.log(`ERROR: Problem sending and removing combo-list from storage...`)
		res.send({ status: 500, message: 'Failed to remove/send combo-list file.' })
	} finally {
		// Remove combo-list from storage
		await fs.remove(`${appDir}/exports/combo-list-${fileID}.txt`)
	}
}

module.exports = {
	uploadFile,
	getComboFile
}
