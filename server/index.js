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
	res.$index = template;

	next();
});

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(config.distPath, 'service-worker.js'));
});

// -----------------------------------------

app.get('/cv/:user', async (req, res, next) => {
	app.set('etag', false);
	res.set('Cache-Control', 'no-store');

	const user = req.params.user || '';
	const cv = user ? await functions.getCv(user) : false;

	if (cv && !cv.locked) {
		res.$index = functions.addCvJsonDataOnPage(cv, res.$index);
		res.$index = metatags.addCvMetaTagsOnPage(cv, res.$index, req);
	}

	next();
});

// -----------------------------------------

app.get('*', (req, res) => {
	res.$index = metatags.addDefaultMetaTagsOnPage(res.$index, req);

	res.setHeader('Content-Type', 'text/html');
	res.status(200).send(res.$index);
});

// -----------------------------------------

app.listen(config.port, () => {
	console.log(`Server is running on port ${ config.port }`);
});
