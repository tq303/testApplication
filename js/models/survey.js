/*global DS: true */
/*global window: true */

(function () {
	'use strict';

	/**
	 * @class Survey
	 * @constructor  [Ember-data Model]
	 */
	window.App.Survey = DS.Model.extend({
		title: 	  DS.attr('string'),
		name: 	  DS.attr('string'),
		dob:      DS.attr('string'),
		location: DS.attr('string'),
		feedback: DS.attr('string'),
	});

}());