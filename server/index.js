const path = require('path');
const express = require('express');
const config = require('./config');
const functions = require('./utils/functions.js');
const metatags = require('./utils/metatags.js');
const compression = require('compression');

const app = express();
const template = functions.getAppIndexAsText();

app.use(compression());

functions.readDir(config.distPath).map(item => item.name).forEach(_static => {
	// serve all folders inside dist as static
	app.use(`/${_static}`, express.static(path.join(`${config.distPath}/${_static}`)));
});

app.use((req, res, next) => {
	if (config.forceHttps && !req.secure && req.get('x-forwarded-proto') !== 'https') {
		return res.redirect(`https://${req.headers.host + req.url}`);
	}

	res.$index = template;

	next();
});

app.get('*/service-worker.js', (req, res) => {
	res.sendFile(path.resolve(config.distPath, 'service-worker.js'));
});

// -----------------------------------------

app.get('/cv/:user', async (req, res, next) => {
	const user = req.params.user;
	res.$cv = user && await functions.getCv(user);

	next();
});

// -----------------------------------------

app.get('*', (req, res) => {
	res.$index = res.$cv && !res.$cv.locked ?
		metatags.addCvMetaTagsOnPage(res.$cv, res.$index, req) :
		metatags.addDefaultMetaTagsOnPage(res.$index, req);

	res.setHeader('Content-Type', 'text/html');
	res.status(200).send(res.$index);
});

// -----------------------------------------

app.listen(config.port, () => {
	console.log(`Server is running on port ${ config.port }`);
});
