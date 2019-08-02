const config = require('../config');
const axios = require('axios');

module.exports = (degree, cb) => {
	axios.get(`${config.FENIX_URL}degrees/${degree}/courses`)
		.then(cb)
		.catch(function (error) {
			console.error(error);
		});
};