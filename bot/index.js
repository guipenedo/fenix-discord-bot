const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');

client.on('ready', () => {
	if(!client.channels.has(config.BOT_CHANNEL)){
		console.error(`Bot channel com o id ${config.BOT_CHANNEL} não encontrado!`);
		process.exit();
	}
	client.bot_channel = client.channels.get(config.BOT_CHANNEL);
});

const commands = require('../commands');
client.on('message', message => {
	if(message.author.bot || !message.content.startsWith(config.BOT_PREFIX))
		return;
	let command = message.content.slice(config.BOT_PREFIX.length);
	if(commands.has(command))
		commands.get(command).handle(message);
	else
		commands.get('help').handle(message);
});

module.exports = client;