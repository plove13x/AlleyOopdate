/* global Ember, WGN, Firebase, DS, filepicker, GeoFire */

(function(){
'use strict';


	window.WGN = Ember.Application.create();

	filepicker.setKey('AnhJmKBYSEWpXfytA3RKQz');

	WGN.ref = new Firebase('https://whosgotnext.firebaseio.com/');


	WGN.geoFire = new GeoFire(WGN.ref.child('_geofire'));
	WGN.geoFireRef = WGN.geoFire.ref();						/* Potentially unnecessary... */


	WGN.ApplicationAdapter = DS.FirebaseAdapter.extend({
		firebase: WGN.ref
	});


})();