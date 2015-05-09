/*global jQuery: true */
/*global Ember: true */
/*global window: true */
/*global Handlebars: true */

(function () {

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
	window.App.IndexRoute      = Ember.Route.extend({});
	window.App.IndexView       = Ember.View.extend({});
	window.App.IndexController = Ember.Controller.extend({});

}());