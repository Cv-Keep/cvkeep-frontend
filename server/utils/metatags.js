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
		page = this.add(page, {
			url: this.getCurrentUrl(req),
			author: config.brandName,
			imageUrl: config.seo.cardUrl,
			title: `${config.brandName.toUpperCase()} - Profile-like Résumé`,
			description: `${config.brandName} - Your resume as an online profile`,
		});

		return page;
	},

	addCvMetaTagsOnPage(cv, page, req) {
		const description = `${cv.basics.fullname} on ${config.brandName}`;
		const presentation = cv.presentation.description.substring(0, 180);

		page = this.add(page, {
			url: this.getCurrentUrl(req),
			imageUrl: config.seo.cardUrl,
			twitterUser: config.seo.twitterUsername,
			author: cv.basics.fullname || config.brandName,
			description: `${ presentation || description }...`,
			title: `${cv.basics.fullname} @ ${config.brandName}`,
		});

		return page;
	},
};
