const FeedParser = require('feedparser');
const Course = require('../models').Course;
const config = require('../config');
const axios = require('axios');
const sendArticle = require('../bot/announcement');
const moment = require('moment');

function handle_feed(course, feed_data){
	let articleList = [];
	feed_data.pipe(new FeedParser())
		.on('readable', function () {
			// This is where the action is!
			let item;
			do {
				item = this.read();
				if (item) articleList.push(item);
			} while(item);
		})
		.on('end', function () {
			//ordenar artigos - há feeds parvos que mandam isto aleatoriamente
			articleList.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());
			for(let i = 0; i < articleList.length; i++){
				//Na primeira vez que corremos este feed, só se FEED_SEND_FIRST. Nas outras vezes, só se o último check por artigos foi anterior a algum artigo.
				if((!course.lastUpdated && config.FEED_SEND_FIRST == 'true') || (course.lastUpdated && course.lastUpdated < articleList[i].date))
					sendArticle(course, articleList[i]);
			}
			course.lastUpdated = Date.now();
			course.save();
		});
}

function checkFeeds() {
	Course.find({active: true}, (error, courses) => {
		if(error) throw error;
		courses.forEach(course => {
			axios({
				metod: 'get',
				url: course.feedLink,
				responseType: 'stream'
			})
				.then(res => handle_feed(course, res.data))
				.catch(function (error) {
					console.error(error);
				});
		});
	});
}

module.exports = {
	run: () => {
		checkFeeds();
		setInterval(checkFeeds, config.FEED_UPDATE_INTERVAL*1000);
	}
};