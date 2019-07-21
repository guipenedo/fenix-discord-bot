const bot = require('./bot');
const config = require('./config');
const fenix = require('./fenix');
const mongoose = require('mongoose');

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true}).then(db => {
	console.log('Ligação ao MongoDB estabelecida com sucesso.');
	fenix.updateData(db);
}).catch(error => {
	console.log('Não foi possível estabelecer uma conexão com o MONGODB_URI especificado.');
	console.error(error);
	process.exit();
});

bot.login(config.BOT_TOKEN).then(() => {
	console.log('Bot conectado ao Discord com sucesso.');
}).catch(error => {
	console.log('Não foi possível fazer login com o BOT_TOKEN especificado.');
	console.error(error);
	process.exit();
});