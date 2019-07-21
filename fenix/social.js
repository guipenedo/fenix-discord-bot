const config = require('../config');
const axios = require('axios');

module.exports = cb => {
	axios.get(`${config.FENIX_URL}canteen`)
		.then(function (response) {
			cb(response.data);
		})
		.catch(function (error) {
			console.error(error);
		});
};