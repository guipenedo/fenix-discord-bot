const Course = require('../models').Course;

module.exports = {
	description: 'Alterar subscrições rss de anúncios',
	usage: '[acrónimo]',
	name: 'rss',
	aliases: ['feeds'],
	admin: true,
	handle: message => {
		let args = message.content.split(' ').slice(1);
		if(args.length > 1)
			return module.exports.showHelp(message);
		if(args.length == 0){
			Course.find({}, (error, courses) => {
				if(error) throw error;
				let courseList = [];
				courses.forEach(course => {
					courseList.push(`${course.active ? '+' : '-'} [${course.acronym}] ${course.name} (${course.active ? 'ativo' : 'inativo'}) - ${course.academicTerm}`);
				});
				let i = 0;
				while( i < courseList.length){
					let msg = '```diff\nLista de cadeiras:';
					for(let j = 0; j < 15 && i < courseList.length; i++, j++)
						msg += '\n' + courseList[i];
					msg += '```';
					message.channel.send(msg);
				}
			});
		} else {
			Course.findOne({acronym: args[0]}, (error, course) => {
				if(error) throw error;
				if(!course)
					return message.channel.send('Cadeira não encontrada.');
				course.active = !course.active;
				course.save();
				message.channel.send(`[${course.acronym}] ${course.name} (*${course.academicTerm}*) está agora **${course.active ? 'ativo' : 'inativo'}**`);
			});
		}
	}
};