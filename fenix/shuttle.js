const config = require('../config');
const axios = require('axios');
const time = require('../helper/time');

module.exports = (date, t, cb) => {
	axios.get(`${config.FENIX_URL}shuttle`)
		.then(function (response) {
			if(!response.data || !('date' in response.data) || !('trips' in response.data))
				return cb(null);
			let d = time.getIntervalFromInput(date, response.data.date);
			if(d == null)
				return cb(null);
			cb(time.removeBefore(t, response.data.trips.filter(t => t.type == d.type)));
		})
		.catch(function (error) {
			console.error(error);
		});
};