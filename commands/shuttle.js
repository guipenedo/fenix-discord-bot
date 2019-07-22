const shuttle = require('../fenix/shuttle');
const discord = require('discord.js');
const time = require('../helper/time');

module.exports = {
	description: 'Horário do shuttle',
	usage: '[hoje/amanha/data] [hora]',
	name: 'shuttle',
	aliases: ['bus'],
	handle: message => {
		let args = message.content.split(' ').slice(1);
		if(args.length > 2)
			return module.exports.showHelp(message);
		if(args.length == 1 && args[0] != 'hoje')
			args[1] = '00:00';
		shuttle(args[0], args[1], data => {
			if(data && data.length){
				let embed = new discord.RichEmbed()
					.setTitle('Horário shuttle - ' + data[0].type)
					.setDescription(time.stringify(args[0], args[1]))
					.setColor('BLUE');
				data.forEach(e => {
					embed.addField(e.stations[0].station + ' -> ' + e.stations[e.stations.length - 1].station, e.stations[0].hour + ' -> ' + e.stations[e.stations.length - 1].hour);
				});
				message.channel.send(embed);
			}else {
				message.channel.send('Não foram encontrados dados para o dia e hora indicados.');
				return;
			}
		});
	}
};