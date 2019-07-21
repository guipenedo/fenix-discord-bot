const fs = require('fs');
const path = require('path');
var mongoose = require('mongoose');

function walk(dir, prefix){
	fs.readdirSync(dir + '/').forEach((file) => {
		if (fs.statSync(dir + '/' + file).isDirectory())
			walk(dir + '/' + file, prefix + file + '/');
		else if (file.match(/\.js$/) && file !== 'index.js') {
			let name = path.parse(file).name;
			let schema = require('./' + prefix + file);
			module.exports[name] = mongoose.model(name, schema);
		}
	});
}

walk(__dirname, '');