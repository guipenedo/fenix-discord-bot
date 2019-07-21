var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
	acronym:  String,
	credits: Number,
	name:   String,
	id:   {
		type: Number, 
		set: v => parseInt(v, 10),
		unique: true
	},
	academicTerm:   String,
	last_updated: { 
		type: Date, 
		default: Date.now 
	},
	active: {
		type: Boolean, 
		default: false
	},
	feedLink: String
});