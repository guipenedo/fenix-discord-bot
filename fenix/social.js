const config = require('../config');
const axios = require('axios');
const time = require('../helper/time');

module.exports = (date, cb) => {
	axios.get(`${config.FENIX_URL}canteen`)
		.then(function (response) {
			if(!response.data || response.data.length == 0)
				return cb(null);
			if(!date)
				return cb(response.data[0]);
			cb(time.getDayFromInput(date, response.data));
		})
		.catch(function (error) {
			console.error(error);
		});
};