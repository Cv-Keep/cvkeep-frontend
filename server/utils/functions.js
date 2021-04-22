const fs = require('fs');
const agent = require('superagent');
const config = require('../config');

module.exports = {
	readFile(target) {
		return fs.readFileSync(target, 'utf-8');
	},

	readDir(target) {
		return fs.readdirSync(target, { withFileTypes: true });
	},

	getAppIndexAsText() {
		return this.readFile(`${config.distPath}/index.html`);
	},

	addJsonDataOnPage(options) {
		const tag = `<script id="${options.dataId}" type="application/json">${JSON.stringify(options.data)}</script>`;
		const page = options.html.replace(`<!--[if server]>${options.dataId}<![endif]-->`, tag);

		return page;
	},

	addCvJsonDataOnPage(cv, html) {
		if (!cv.locked && !cv.passwordProtected) {
			return this.addJsonDataOnPage({
				html,
				data: cv,
				dataId: 'cv-data',
			});
		}
	},

	getCv(user) {
		return new Promise(resolve => {
			agent.get(`${config.apiUrl}/curriculum/get/?username=${user}`)
				.then(res => resolve(res.body))
				.catch(() => resolve(null));
		});
	},
};
