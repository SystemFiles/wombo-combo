const MAX_SIZE_MB = 10;

const buildCombo = (usernames, passwords) =>
	new Promise((resolve, reject) => {
		try {
			let usernameList = usernames.replace('\r', '').split('\n');
			let passwordList = passwords.replace('\r', '').split('\n');
			let comboList = [];

			for (let j = 0; j < usernameList.length; j++) {
				const username = usernameList[j].replace('\r', '');

				for (let k = 0; k < passwordList.length; k++) {
					const password = passwordList[k].replace('\r', '');
					comboList.push(`${username}:${password}`);
				}
			}
			resolve(comboList.join('\n'));
		} catch (err) {
			reject(err);
		}
	});

const upload = (files) =>
	new Promise((resolve, reject) => {
		for (let i = 0; i < files.length; i++) {
			if (files[i].size > 1024 * 1024 * MAX_SIZE_MB) {
				reject(`Sorry, the file you have uploaded exceeds ${MAX_SIZE_MB}MB cap... (size: ${files[i].size})`);
			}

			// Build the combo list for output
			let usernamesBuffer = files[0].fieldname === 'usernames' ? files[0].buffer : files[1].buffer;
			let passwordsBuffer = files[0].fieldname === 'passwords' ? files[0].buffer : files[1].buffer;

			buildCombo(usernamesBuffer.toString(), passwordsBuffer.toString())
				.then((result) => {
					resolve(result);
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		}
	});

module.exports = {
	upload
};
