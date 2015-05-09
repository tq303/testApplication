/*global require: true */
/*global __dirname: true */
/*global setImmediate: true */

(function () {

	'use strict';

	var bodyParser = require('body-parser'),
		express    = require('express'),
		path       = require('path'),
		mkdirp	   = require('mkdirp'),
		winston    = require('winston');

	/**
	 * [Express Setup]
	 */
	var app  = express(),
		port = process.argv[2] || 9015;

	app.use(express.static(path.normalize(__dirname)));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true,
	}));

	/**
	 * [Setup logging]
	 */
	mkdirp('./logs', function (err) {

		winston.add(winston.transports.DailyRotateFile, {
			name: 'file',
			datePattern: '.yyyy-MM-dd.log',
			filename: path.join(__dirname, 'logs', 'test_application'),
			handleExceptions: true,
		});

		app.listen(port);

		winston.info('Listening on port %d …', port);
	});

}());