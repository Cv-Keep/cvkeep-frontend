const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const stage = process.env.NODE_ENV || '';

module.exports = {
	getEnv(debug = false) {
		const envPath = this.getEnvPath();
		const envContent = this.getEnvContent(envPath);
		const dotEnv = this.parseEnvFile(envContent, debug);

		return Object.assign(process.env, dotEnv);
	},

	getEnvPath() {
		const cvKeepRoot = path.resolve(__dirname, '../..');
		const useDotLocal = !stage && fs.existsSync(path.resolve(cvKeepRoot, `.env.local`));
		const envFileName = useDotLocal ? '.env.local' : `.env${ stage ? '.' + stage : '' }`;

		return path.resolve(cvKeepRoot, envFileName);
	},

	getEnvContent(envPath) {
		return fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
	},

	parseEnvFile(envContent, debug) {
		return dotenv.parse(envContent, { debug });
	},
};
