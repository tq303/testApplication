/*global jQuery: true */
/*global Ember: true */
/*global window: true */
/*global Handlebars: true */

(function () {

	'use strict';

	/**
	 * [App creation of Ember application]
	 */
	window.App = Ember.Application.create();
	
	/**
	 * API Setup
	 */
	// prepend api url
	var api_namespace = 'API/1';

	window.App.ApplicationAdapter = DS.RESTAdapter.extend({
		namespace: api_namespace
	});

	/**
	 * [Ember route setup]
	 */
	window.App.Router.map(function () {
		this.route('index', { path : '/' });
	});

}());