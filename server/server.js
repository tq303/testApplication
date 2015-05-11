/*global require: true */
/*global __dirname: true */
/*global setImmediate: true */

(function () {

	'use strict';

	var bodyParser = require('body-parser'),
		express    = require('express'),
		path       = require('path'),
		mkdirp	   = require('mkdirp'),
		winston    = require('winston'),
		request    = require('request');

	/**
	 * @module  Express
	 */
	var app  = express(),
		port = process.argv[2] || 9015,
		putsreq = 'https://putsreq.com/oAzae0r1TNdeN0h2hnFf';

	app.use(express.static(path.normalize(__dirname)));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true,
	}));

	/**
	 * @module  Express
	 * @method  [Retrieves survey object ready for saving]
	 */
	app.post('/API/1/surveys', function (req, res) {
		// before returning object first send it to putsreq
		request({
			url: putsreq,
			method: 'POST',
			form: req.body.survey,
			json: true
		}, function(error, response, body) {

			res.send({
				'survey': req.body.survey
			});

		});
	});

	/**
	 * @module  Winston
	 * @method [Setup logging]
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