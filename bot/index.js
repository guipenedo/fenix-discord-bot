const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('../config');
const Queue = require('double-ended-queue');

client.on('ready', () => {
	if(!client.channels.has(config.BOT_CHANNEL)){
		console.error(`Bot channel com o id ${config.BOT_CHANNEL} não encontrado!`);
		process.exit();
	}
	client.bot_channel = client.channels.get(config.BOT_CHANNEL);
	handleQueue();
});

var messageQueue = new Queue();
function handleQueue(){
	if(client && client.bot_channel)
		while(!messageQueue.isEmpty())
			client.bot_channel.send(messageQueue.shift());
}

client.queueMessage = msg => {
	messageQueue.push(msg);
	handleQueue();
};

const commands = require('../commands');
client.on('message', message => {
	if(message.author.bot || !message.content.startsWith(config.BOT_PREFIX))
		return;
	let command = message.content.slice(config.BOT_PREFIX.length).split(' ')[0];
	if(commands.has(command)){
		if(!commands.get(command).admin || message.member.hasPermission('MANAGE_CHANNELS'))
			commands.get(command).handle(message);
		else
			message.channel.send('Este comando requer a permissão *MANAGE_CHANNELS*.');
	} else
		commands.get('help').handle(message);
});

module.exports = client;