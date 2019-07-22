const config = require('../config');
const axios = require('axios');

module.exports = {
	updateData(mongoose){
		axios.get(`${config.FENIX_URL}degrees/${config.FENIX_DEGREE}/courses`)
			.then(function (response) {
				//console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
};