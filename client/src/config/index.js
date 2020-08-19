require('dotenv').config()

module.exports = {
	UPLOAD_ENDPOINT   : process.env.UPLOAD_ENDPOINT || 'https://wc.sykesdev.ca/api/list/upload',
	DOWNLOAD_ENDPOINT : process.env.DOWNLOAD_ENDPOINT || 'https://wc.sykesdev.ca/api/list/download'
}
