const config = require('../config');
const axios = require('axios');

module.exports = {
	get: (id, cb) => {
		axios.get(`${config.FENIX_URL}courses/${id}`)
			.then(cb)
			.catch(function (error) {
				console.error(error);
			});
	},
	evaluations: (id, cb) => {
		axios.get(`${config.FENIX_URL}courses/${id}/evaluations`)
			.then(cb)
			.catch(function (error) {
				console.error(error);
			});
	},
	groups: (id, cb) => {
		axios.get(`${config.FENIX_URL}courses/${id}/groups`)
			.then(cb)
			.catch(function (error) {
				console.error(error);
			});
	},
	schedule: (id, cb) => {
		axios.get(`${config.FENIX_URL}courses/${id}/schedule`)
			.then(cb)
			.catch(function (error) {
				console.error(error);
			});
	},
	students: (id, cb) => {
		axios.get(`${config.FENIX_URL}courses/${id}/students`)
			.then(cb)
			.catch(function (error) {
				console.error(error);
			});
	}
};