//taken from https://github.com/synzen/Discord.RSS/blob/master/structs/Article.js
const htmlConvert = require('html-to-text');

module.exports = text => {
	if (!text) return '';
	if(!text.replace) return text;
	text = text.replace(/\*/gi, '')
		.replace(/<(strong|b)>(.*?)<\/(strong|b)>/gi, '**$2**') // Bolded markdown
		.replace(/<(em|i)>(.*?)<(\/(em|i))>/gi, '*$2*') // Italicized markdown
		.replace(/<(u)>(.*?)<(\/(u))>/gi, '__$2__'); // Underlined markdown
	
	text = htmlConvert.fromString(text, {
		wordwrap: null,
		ignoreHref: true,
		noLinkBrackets: true
	});
		
	text = text.replace(/\n\s*\n\s*\n/g, '\n\n') // Replace triple line breaks with double
		.replace(/@/g, '@' + String.fromCharCode(8203)); // Sanitize mentions with zero-width character "\u200b", does not affect subscribed roles or modify anything outside the scope of sanitizing Discord mentions in the raw RSS feed content
	const arr = text.split('\n');
	for (var q = 0; q < arr.length; ++q) arr[q] = arr[q].replace(/\s+$/, ''); // Remove trailing spaces
	return arr.join('\n');
};