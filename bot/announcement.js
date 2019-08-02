const client = require('./index');
const cleanup = require('../helper/html_cleaner');
const config = require('../config');
const time = require('../helper/time');

module.exports = (course, article) => {
	let message = config.BOT_ANNOUNCEMENT;
	message = message.replace(/{course_acronym}/g, course.acronym);
	message = message.replace(/{course_name}/g, course.name);
	message = message.replace(/{title}/g, cleanup(article.title));
	message = message.replace(/{date}/g, time.prettyString(article.date));
	message = message.replace(/{author}/g, cleanup(article.author));
	message = message.replace(/{link}/g, cleanup(article.link));
	let description = cleanup(article.description);
	if(message.includes('{description}') && message.length + description.length - '{description}'.length > 2000)
		description = description.substring(2000 - message.length + '{description}'.length - 3) + '...';
	message = message.replace(/{description}/g, description);
	client.queueMessage(message);
};