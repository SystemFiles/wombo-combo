const fs = require('fs');
const es = require('event-stream');
const uuid = require('uuid');

const buildCombo = (usernames, passwords, vars) =>
	new Promise((resolve, reject) => {
		try {
			// Output stream
			let fileID = uuid.v4();
			let comboOutStream = fs.createWriteStream(`uploads/comoblist-${fileID}.txt`, {
				flags    : 'a',
				encoding : 'utf-8'
			});

			let userRS = fs
				.createReadStream(usernames.path, {
					flags    : 'r',
					encoding : 'utf-8'
				})
				.pipe(es.split())
				.pipe(
					es.mapSync((username) => {
						userRS.pause();

						let passRS = fs
							.createReadStream(passwords.path, {
								flags    : 'r',
								encoding : 'utf-8'
							})
							.pipe(es.split())
							.pipe(
								es.mapSync((password) => {
									passRS.pause();

									// Write combo to file
									comboOutStream.write(`${username}:${password}\n`);

									passRS.resume();
								})
							);

						userRS.resume();
					})
				);

			userRS.once('end', () => resolve(`uploads/comoblist-${fileID}.txt`));
			// TODO: Fix async error resolving file path before file write is done.
		} catch (err) {
			reject(err);
		}
	});

const upload = (files) =>
	new Promise((resolve, reject) => {
		// Build the combo list for output
		let usernamesFile = files[0].fieldname === 'usernames' ? files[0] : files[1];
		let passwordsFile = files[0].fieldname === 'passwords' ? files[0] : files[1];

		if (usernamesFile != null && passwordsFile != null) {
			buildCombo(usernamesFile, passwordsFile, null)
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		} else {
			reject(`Something went wrong trying to parse file streams...`);
		}
	});

module.exports = {
	upload
};
