const moment = require('moment');
const config = require('../config');

var self = module.exports = {
	parseDate(input){
		return moment(input, 'DD-MM-YYYY');
	},
	parseTime(input){
		return input ? moment(input, 'HH:mm') : moment();
	},
	stringify(date, time){
		return self.getMomentFromInput(date).format('DD/MM/YYYY') + ' ' + self.parseTime(time).format('HH:mm');
	},
	prettyString(date){
		moment.locale(config.LOCALE || 'pt');
		return moment(date).format('LLLL');
	},
	getMomentFromInput(input){
		let day = moment();
		if(input == 'amanha')
			day = day.add(1, 'd');
		else if(input && input != 'hoje')
			day = self.parseDate(input);
		if(!day.isValid()) return null;
		return day;
	},
	getIntervalFromInput(input, intervals){
		let day = self.getMomentFromInput(input);
		if(day == null)
			return null;
		return intervals.find(i => day.isBetween(self.parseDate(i.start), self.parseDate(i.end), 'day'));
	},
	getDayFromInput(input, days){
		let day = self.getMomentFromInput(input);
		if(day == null) return null;
		return days.find(d => day.isSame(self.parseDate(d.day), 'day'));
	},
	removeBefore(input, objs){
		let time = self.parseTime(input);
		if(!time.isValid()) return [];
		return objs.filter(o => {
			return self.parseTime(o.stations[0].hour).isSameOrAfter(time);
		});
	}
};