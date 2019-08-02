const fs = require('fs');
const config = require('../config');

module.exports = new Map();

var helpList = '';

function walk(dir, prefix){
	fs.readdirSync(dir + '/').forEach((file) => {
		if (fs.statSync(dir + '/' + file).isDirectory())
			walk(dir + '/' + file, prefix + file + '/');
		else if (file.match(/\.js$/) && file !== 'index.js') {
			let command = require('./' + prefix + file);
			module.exports.set(command.name, command);
			command.aliases.forEach(alias => {
				module.exports.set(alias, command);
			});
			command.helpString = `${config.BOT_PREFIX}${command.name} ${command.usage} - ${command.description}`;
			command.showHelp = message => message.channel.send(`\`\`\`${command.helpString}\`\`\``);
			if(!command.admin)
				helpList += `${command.helpString}\n`;
		}
	});
}

walk(__dirname, '');
module.exports.set('help', {
	handle(msg){
		msg.channel.send(`\`\`\`Command list:\n${helpList}\n[] - opcional <> - obrigatório\`\`\``);
	}
});