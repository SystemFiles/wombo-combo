const stream = require('stream')
const util = require('util')
const readline = require('readline')
const fs = require('fs-extra')
const os = require('os')
const { addMispelledWords, addCommonPasswords, addCommonReplacements } = require('./manglingService')
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
				if (password.length > 0) {
					// Ignore empty lines
					yield `${username}:${password}${os.EOL}`
				}
			}
		}
	}, fs.createWriteStream(outFilePath))
}

const manglePasswords = async (passwordFile, selections) => {
	let manglePromises = []

	console.log(selections)

	if (selections) {
		if (selections.autoCorrect === true || selections.autoCorrect === 'true') {
			manglePromises.push(addMispelledWords(passwordFile.path))
		}
		if (selections.commonReplacements === true || selections.commonReplacements === 'true') {
			manglePromises.push(addCommonReplacements(passwordFile.path))
		}
		if (selections.prefixSuffixInsertion === 'true') {
			// Pass
		}
		if (selections.wordPermutations === 'true') {
			// Pass
		}
		if (selections.commonPasswords === true || selections.commonPasswords === 'true') {
			manglePromises.push(addCommonPasswords(passwordFile.path))
		}
	}

	if (manglePromises.length > 0) {
		await Promise.all(manglePromises)
	} else {
		console.log('No mangling rules selected...skipping')
	}
}

const buildCombo = (usernames, passwords, vars) =>
	new Promise((resolve, reject) => {
		// Generate combo result path & ID
		const fileID = uuid()
		const comboPath = `exports/combo-list-${fileID}.txt`

		// Mangle password with selected rules
		manglePasswords(passwords, vars)
			.then(() => {
				// Combine usernames and passwords
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
			.catch((err) => {
				throw new Error(err)
			})
	})

const upload = (files, vars) =>
	new Promise((resolve, reject) => {
		// Build the combo list for output
		let usernamesFile = files[0].fieldname === 'usernames' ? files[0] : files[1]
		let passwordsFile = files[0].fieldname === 'passwords' ? files[0] : files[1]

		// If we have everything, build combo with rules (vars)
		if (usernamesFile != null && passwordsFile != null && vars != null) {
			buildCombo(usernamesFile, passwordsFile, vars)
				.then((fileID) => {
					resolve(fileID)
				})
				.catch((err) => {
					console.log(err)
					throw new Error(err)
				})
		} else {
			throw new Error(`Something went wrong trying to read request data...`)
		}
	})

module.exports = {
	upload
}
