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
		return req ? `${req.protocol}://${req.get('host')}${req.originalUrl}` : config.clientUrl;
	},

	addDefaultMetaTagsOnPage(page, req) {
		page = this.add(page, {
			url: this.getCurrentUrl(req),
			title: `${config.brandName.toUpperCase()} - Profile-like Résumé`,
			author: config.brandName,
			imageUrl: `${config.clientUrl}/seo/card.png`,
			description: `${config.brandName} - Your resume as an online profile`,
		});

		return page;
	},

	addCvMetaTagsOnPage(cv, page, req) {
		const description = `${cv.basics.fullname} on ${config.brandName}`;
		const presentation = cv.presentation.description.substring(0, 180);

		page = this.add(page, {
			twitterUser: 'cvkeep',
			url: this.getCurrentUrl(req),
			title: `${cv.basics.fullname} @ ${config.brandName}`,
			author: `${config.brandName} : ${cv.basics.fullname}`,
			imageUrl: `${config.clientUrl}/seo/card.png`,
			description: `${ presentation || description }...`,
		});

		return page;
	},
};
