const Handlebars = require('handlebars');
const functions = require('./functions.js');
const config = require('../config');

module.exports = {
	add(html, metas) {
		const template = Handlebars.compile(this.getTemplate());
		const metatags = template(metas);

		return html = html.replace('<!--[if server]>seo<![endif]-->', metatags);
	},

	getTemplate() {
		return functions.readFile(`${config.serverPath}/templates/metatags.hbs`);
	},

	getCurrentUrl(req) {
		return req ? `${req.protocol}://${req.get('host')}${req.originalUrl}` : '';
	},

	addDefaultMetaTagsOnPage(page, req) {
		return this.add(page, {
			url: this.getCurrentUrl(req),
			author: config.brandName,
			imageUrl: config.seo.cardUrl,
			title: `${config.brandName.toUpperCase()} - Profile-like Resumé`,
			description: `${config.brandName} - Your resume as an online profile`,
		});
	},

	addCvMetaTagsOnPage(cv, page, req) {
		return this.add(page, {
			url: this.getCurrentUrl(req),
			imageUrl: config.seo.cardUrl,
			twitterUser: config.seo.twitterUsername,
			author: cv.basics.fullname || config.brandName,
			title: `${cv.basics.fullname} @ ${config.brandName}`,
			description: `${cv.basics.fullname || cv.username} on ${config.brandName}`,
		});
	},
};
