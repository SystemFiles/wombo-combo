const rateLimit = require('express-rate-limit');

const mainLimiter = rateLimit({
	windowMs : 24 * 60 * 60 * 1000,
	max      : 100,
	message  : 'You have exceeded the maximum of 100 requests to this endpoint in 24hrs...',
	headers  : true
});

module.exports = {
	mainLimiter
};
