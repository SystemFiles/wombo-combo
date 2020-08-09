const stream = require('stream')
const util = require('util')
const readline = require('readline')
const fs = require('fs-extra')
const os = require('os')
const uuid = require('uuid').v4

/** Returns a readable stream as an async iterable over text lines */
function lineIteratorFromFile(fileStream) {
	return readline.createInterface({
		input     : fileStream,
		crlfDelay : Infinity
	})
}

async function combineUserPass(usernames, passwords, outFilePath) {
	await util.promisify(stream.pipeline)(async function*() {
		for await (const username of lineIteratorFromFile(fs.createReadStream(usernames.path))) {
			for await (const password of lineIteratorFromFile(fs.createReadStream(passwords.path))) {
				yield `${username}:${password}${os.EOL}`
			}
		}
	}, fs.createWriteStream(outFilePath))
}

const buildCombo = (usernames, passwords, vars) =>
	new Promise((resolve, reject) => {
		const fileID = uuid()
		const comboPath = `exports/combo-list-${fileID}.txt`
		combineUserPass(usernames, passwords, comboPath)
			.then(() => {
				resolve({
					userFileName : usernames.filename,
					passFileName : passwords.filename,
					fileID       : fileID
				})
			})
			.catch((err) => {
				reject(err)
			})
	})

const upload = (files) =>
	new Promise((resolve, reject) => {
		// Build the combo list for output
		let usernamesFile = files[0].fieldname === 'usernames' ? files[0] : files[1]
		let passwordsFile = files[0].fieldname === 'passwords' ? files[0] : files[1]

		if (usernamesFile != null && passwordsFile != null) {
			buildCombo(usernamesFile, passwordsFile, null)
				.then((fileID) => {
					resolve(fileID)
				})
				.catch((err) => {
					console.log(err)
					reject(err)
				})
		} else {
			reject(`Something went wrong trying to parse file streams...`)
		}
	})

module.exports = {
	upload
}
