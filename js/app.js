/*global jQuery: true */
/*global Ember: true */
/*global window: true */
/*global Handlebars: true */

var ts = ts || function () {};

(function (ts) {

	'use strict';

	/**
	 * [Creation of Ember application]
	 */
	window.App = Ember.Application.create();
	
	/**
	 * [Ember API Setup]
	 */
	var api_namespace 			  = 'API/1';
	window.App.ApplicationAdapter = DS.RESTAdapter.extend({
		namespace: api_namespace
	});

	/**
	 * [Ember route setup]
	 */
	window.App.Router.map(function () {
		this.route('index', { path : '/' });
	});

	/**
	 * [Ember Application Logic]
	 */
	window.App.IndexRoute      = Ember.Route.extend({
		setupController: function (controller, model) {
			controller.get('GetYears');

			// get location of user
			ts.geolocation(function (data, position) {
				controller.set('current_location', data.results[0].address_components[2].short_name);
			});
		}
	});
	window.App.IndexView       = Ember.View.extend({});
	window.App.IndexController = Ember.Controller.extend({

		// page vairables
		current_page: 1,
		max_page: 3,
		min_page: 1,

		// form content
		title_options: ['Mr', 'Mrs', 'Ms', 'Miss'],
		title: 'Mr',
		users_name: '',
		feedback: '',
		dob_day:   1,
		dob_month: null,
		dob_year:  null,
		days: null,
		months: [
			{'value':1,  'month': 'jan'},
			{'value':2,  'month': 'feb'},
			{'value':3,  'month': 'mar'},
			{'value':4,  'month': 'apr'},
			{'value':5,  'month': 'may'},
			{'value':6,  'month': 'jun'},
			{'value':7,  'month': 'jul'},
			{'value':8,  'month': 'aug'},
			{'value':9,  'month': 'sep'},
			{'value':10, 'month': 'oct'},
			{'value':11, 'month': 'nov'},
			{'value':12, 'month': 'dec'}
		],
		years: null,

		// DOB logic
		GetDays: function () {
			var days = [],
				total_days = 31,
				thirty_days = [4,6,9,11],
				twentynine_days = [2],
				i;

			// set && limit days
			if (thirty_days.indexOf(this.get('dob_month')) >= 0)
				total_days = 30;

			if (twentynine_days.indexOf(this.get('dob_month')) >= 0)
				total_days = 29;

			for (i = 1; i <= total_days; i++)
				days.push(i);

			return this.set('days', days);
		}.observes('dob_month'),

		GetYears: function () {
			var years = [],
				current_year = (new Date().getFullYear()),
				i;

			for (i = current_year; i >= 1940; i--)
				years.push(i);

			return this.set('years', years);
		}.property(),

		// current location and date/time data
		current_location: '',
		GetDateTime: function () {
			var date = new Date();
			return (date.toDateString() + ' : ' + date.toTimeString());
		}.property(),

		// page navigation logic
		HasBackOption: function () {
			return (this.get('current_page') > 1);
		}.property('current_page'),

		IsLastPage: function () {
			return (this.get('current_page') === this.get('max_page'));
		}.property('current_page'),

		SlidePosition: function () {
			switch (this.get('current_page')) {
				case 1:
					return 'page-one';
				case 2:
					return 'page-two';
				case 3:
					return 'page-three';
			};
		}.property('current_page'),

		// simple page validation
		PageValidated: function () {
			if (this.get('users_name') === '' && this.get('current_page') === 1) {
				window.bootbox.alert('Please provide a name');
				return false;
			}
			if (this.get('current_location') === '' && this.get('current_page') === 2) {
				window.bootbox.alert('Please provide a location');
				return false;
			}
			if (this.get('feedback') === '' && this.get('current_page') === 3) {
				window.bootbox.alert('Please provide feedback');
				return false;
			}
			return true;
		},

		// application actions
		actions: {
			GotoNextPage: function () {
				if (this.get('current_page') === this.get('max_page') || !this.PageValidated())
					return;

				this.set('current_page', (this.get('current_page') + 1));
			},
			GotoPreviousPage: function () {
				if (this.get('current_page') === this.get('min_page') || !this.PageValidated())
					return;

				this.set('current_page', (this.get('current_page') - 1));
			},
			SubmitForm: function () {
				if (!this.PageValidated())
					return;

				var form_json = {
					'title': this.get('title'),
					'name': this.get('users_name'),
					'dob': this.get('dob_day') + '-' + this.get('dob_month') + '-' + this.get('dob_year'),
					'location': this.get('current_location'),
					'feedback': this.get('feedback')
				};

				window.console.log(form_json);

				// save survey to server
				var survey = this.store.createRecord('survey', form_json);
				survey.save().then(function () {
					window.bootbox.alert('Thank you for submitting your survey');
				}, function () {
					window.bootbox.alert('There was an error saving your survey');
				});
			}
		},
	});
	
	/**
	 * Navigation
	 */
	/**
	 * [geolocation uses native geolocation API of browser]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	ts.geolocation = function (callback) {

		if (typeof callback !== 'function')
			throw new Error('geolocation requires a callback function');

		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				ts.getGeoLocation(position, callback);
			}, function(e) {
				ts.handleNoGeolocation(e);
			},{
				timeout: 5000
			});
		}
	};

	/**
	 * [getGeoLocation AJAX call to retrieve data]
	 * @param  {[type]}   position [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	ts.getGeoLocation = function (position, callback) {
		Ember.$.ajax({
			type: "GET",
			url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude,
			dataType: "json"
		})
		.done(function(data) {
			callback(data, position);
		});
	};

	ts.handleNoGeolocation = function (event) {
		window.console.log('browser doesn\'t support geolocation', event);
	};

}(ts));