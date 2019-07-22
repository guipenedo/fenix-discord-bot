const social = require('../fenix/social');
const discord = require('discord.js');

module.exports = {
	description: 'Ver o prato do social',
	usage: '[hoje/amanha/data]',
	name: 'social',
	aliases: ['s', 'inferno', 'cantina'],
	handle: message => {
		let args = message.content.split(' ').slice(1);
		if(args.length > 1)
			return module.exports.showHelp(message);
		social(args.length == 1 ? args[0] : null, data => {
			if(!data){
				message.channel.send('Não foram encontrados dados para o dia indicado.');
				return;
			}
			let embed = new discord.RichEmbed()
				.setTitle('Menu do social')
				.setDescription(data.day)
				.setColor('AQUA');
			data.meal.forEach((m, i) => {
				m.info.forEach(p => {
					embed.addField(`${m.type}: ${p.type}`, p.name);
				});
				if(i != data.meal.length -1)
					embed.addBlankField();
			});
			message.channel.send(embed);
		});
	}
};