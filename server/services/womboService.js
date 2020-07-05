const MAX_SIZE_MB = 200;

const upload = (files) =>
	new Promise((resolve, reject) => {
		for (let i = 0; i < files.length; i++) {
			if (files[i].size > 1024 * MAX_SIZE_MB) {
				reject(`Sorry, the file you have uploaded exceeds ${MAX_SIZE_MB}MB cap... (size: ${files[i].size})`);
			}

			//
		}
		resolve(files);
	});

module.exports = {
	upload
};
