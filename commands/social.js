const social = require('../fenix/social');
const discord = require('discord.js');

module.exports = {
	description: 'Ver o prato do social',
	usage: '<hoje/amanhã/data>(hoje)',
	name: 'social',
	aliases: ['s', 'inferno', 'cantina'],
	handle: message => {
		social(data => {
			if(data && data.length){
				let embed = new discord.RichEmbed()
					.setTitle('Menu do social')
					.setDescription(data[0].day)
					.setColor('AQUA');
				data[0].meal.forEach((m, i) => {
					m.info.forEach(p => {
						embed.addField(`${m.type}: ${p.type}`, p.name);
					});
					if(i != data[0].meal.length -1)
						embed.addBlankField();
				});
				message.channel.send(embed);
			}
		});
	}
};