const path = require('path');
const stage = process.env.NODE_ENV || '';
const envUtils = require('./envUtils.js');

const env = envUtils.getEnv();
const envPath = envUtils.getEnvPath();
console.log(`Environment: "${stage}". Using .env file "${envPath}"`);

module.exports = {
	port: Number(env.FRONT_PROD_SERVER_PORT) || process.env.PORT,
	apiUrl: env.VUE_APP_API_URL,
	brandName: env.VUE_APP_BRAND_NAME,
	serverPath: path.resolve(__dirname, '..'),
	distPath: path.resolve(__dirname, '../..', 'dist'),
	seo: {
		cardUrl: env.FRONT_PROD_SERVER_SEO_CARD_URL,
		twitterUsername: env.VUE_APP_TWITTER_USERNAME,
	},
};
