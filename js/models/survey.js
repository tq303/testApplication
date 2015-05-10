/*global DS: true */
/*global window: true */

/**
 * [Survey model for saving to server]
 */
(function () {
	'use strict';

	window.App.Survey = DS.Model.extend({
		title: 	  DS.attr('string'),
		name: 	  DS.attr('string'),
		dob:      DS.attr('string'),
		location: DS.attr('string'),
		feedback: DS.attr('string'),
	});

}());