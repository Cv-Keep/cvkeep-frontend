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

	getCv(user) {
		return new Promise(resolve => {
			agent.get(`${config.apiUrl}/curriculum/get/?username=${user}`)
				.then(res => resolve(res.body))
				.catch(() => resolve(null));
		});
	},
};
