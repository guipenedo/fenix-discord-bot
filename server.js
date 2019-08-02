const bot = require('./bot');
const feed_handler = require('./helper/feed_handler');
const config = require('./config');
const mongoose = require('mongoose');
const data_update = require('./helper/data_update');

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true}).then(() => {
	console.log('Ligação ao MongoDB estabelecida com sucesso.');
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

data_update.run();
feed_handler.run();