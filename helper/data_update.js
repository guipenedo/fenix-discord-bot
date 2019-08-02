const Updates = require('../models').Updates;
const degree_courses = require('../fenix/degrees_courses');
const courses = require('../fenix/courses');
const config = require('../config');
const Course = require('../models').Course;

function getLastUpdate(){
	return new Promise(function(resolve, reject) {
		Updates.findOne().exec((error, result) => {
			if (!error) {
				if (result){
					resolve(result);
				}else 
					resolve(new Updates());
			} else
				reject(error);
		});
	});
}

function updateRooms(lastUpdate){
	return new Promise(function(resolve){
		//if((new Date()) - config.rooms <= 5*3600*1000)
		resolve({lastUpdate: lastUpdate, updated: true});
	});
}

function updateCourses(lastUpdate){
	return new Promise(function(resolve){
		if(lastUpdate.courses && (new Date()) - lastUpdate.courses <= 5*3600*1000)
			return resolve({lastUpdate: lastUpdate, updated: false});
		degree_courses(config.FENIX_DEGREE, res => {
			if(!res.data || !res.data.length)
				return resolve({lastUpdate: lastUpdate, updated: false});
			res.data.forEach(cdata => {
				var id = parseInt(cdata.id, 10);
				Course.updateOne({id: id}, cdata, {upsert: true}).then(() => {
					courses.get(cdata.id, res => {
						if(!res.data) return;
						Course.updateOne({id: id}, {feedLink: res.data.announcementLink}).exec();
					});
				});
			});
			resolve({lastUpdate: lastUpdate, updated: true});
		});
	});
}

function runUpdate(){
	getLastUpdate()
		.then(updateRooms)
		.then(res => {
			if(res.updated)
				res.lastUpdate.rooms = new Date();
			return res.lastUpdate;
		})
		.then(updateCourses)
		.then(res => {
			if(res.updated)
				res.lastUpdate.courses = new Date();
			return res.lastUpdate;
		}).then(lastUpdate => {
			lastUpdate.save();
		}).catch(error => console.error(error));
}

module.exports.run = () => {
	runUpdate();
	setInterval(runUpdate, 5*3600*1000);
};