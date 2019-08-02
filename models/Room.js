var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
	type:  String,
	name:   String,
	id:   {
		type: Number, 
		set: v => parseInt(v, 10),
		unique: true
	},
	subspaces: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Room'
		}
	],
	last_updated: { 
		type: Date,
		default: Date.now
	}
});