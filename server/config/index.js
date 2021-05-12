const path = require('path');
const stage = process.env.NODE_ENV || '';
const envUtils = require('./envUtils.js');

const env = envUtils.getEnv();
const envPath = envUtils.getEnvPath();
console.log(`Environment: "${stage}". Using .env file "${envPath}"`);

module.exports = {
	port: Number(env.FRONT_SERVER_PORT),
	clientUrl: env.FRONT_SERVER_APP_URL,

	apiUrl: env.VUE_APP_API_URL,
	brandName: env.VUE_APP_BRAND_NAME,

	serverPath: path.resolve(__dirname, '..'),
	distPath: path.resolve(__dirname, '../..', 'dist'),
};
