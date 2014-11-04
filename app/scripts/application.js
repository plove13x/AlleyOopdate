/* global Ember, WGN, Firebase, DS */

(function(){
'use strict';


	window.WGN = Ember.Application.create();

	filepicker.setKey("AnhJmKBYSEWpXfytA3RKQz");

	WGN.ref = new Firebase('https://whosgotnext.firebaseio.com/');

	WGN.ApplicationAdapter = DS.FirebaseAdapter.extend({
		firebase: WGN.ref
	});


})();