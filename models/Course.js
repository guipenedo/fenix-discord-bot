var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
	acronym:  String,
	credits: {
		type: Number, 
		set: v => parseFloat(v, 10)
	},
	name:   String,
	id:   {
		type: Number, 
		set: v => parseInt(v, 10),
		unique: true
	},
	academicTerm: String,
	lastUpdated: Date,
	active: {
		type: Boolean, 
		default: false
	},
	feedLink: String
});