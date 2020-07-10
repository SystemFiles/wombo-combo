const fs = require('fs');
const readline = require('readline');
const uuid = require('uuid');

const buildCombo = (usernames, passwords, vars) =>
	new Promise((resolve, reject) => {
		try {
			// TODO: Figure out how to read from username and password files and output to unique combolist file without wasting memory

			// Create filestream to write
			let fileWriteStream = fs.createWriteStream(`uploads/combolist-${uuid.v4()}.txt`, {
				flags : 'a'
			});

			// Create reader interface to pull data from file w/o wasting memory
			let userReader = readline.createInterface({
				input     : fs.createReadStream(usernames.path, {
					flags : 'r'
				}),
				crlfDelay : Infinity
			});
			let passReader = readline.createInterface({
				input     : fs.createReadStream(passwords.path, {
					flags : 'r'
				}),
				crlfDelay : Infinity
			});

			let usernameList = [];
			let passwordList = [];

			// Write to combo file
			userReader.on('line', (username) => {
				usernameList.push(username);
			});

			passReader.on('line', (password) => {
				passwordList.push(password);
			});

			fileWriteStream.write('hello');
			fileWriteStream.write('hello');
			fileWriteStream.write('hello');
			fileWriteStream.write('hello');
			fileWriteStream.write('hello');

			for (let i = 0; i < usernameList.length; i++) {
				for (let j = 0; j < passwordList.length; j++) {
					fileWriteStream.write(usernameList[i] + ':' + passwordList[j]);
				}
			}

			fileWriteStream.close();

			resolve('outputFile');
		} catch (err) {
			reject(err);
		}
	});

const upload = (files) =>
	new Promise((resolve, reject) => {
		for (let i = 0; i < files.length; i++) {
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
		}
	});

module.exports = {
	upload
};
