/* global WGN, DS */

(function(){
'use strict';


	WGN.User = DS.Model.extend({
		handle: DS.attr('string'),
	    email: DS.attr('string'),
	    password: DS.attr('string'),
		alleyOopdates: DS.hasMany('alleyOopdate'),
		avatarUrl: DS.attr('string'),
		// courts: DS.hasMany('court'),
		latitude: DS.attr('number'),
		longitude: DS.attr('number'),
		location: function(){
			return this.getProperties('latitude', 'longitude');
		}.property('latitude', 'longitude'),
		courtVisuals: DS.hasMany('courtVisual'),
		courtPhotos: DS.hasMany('courtPhoto'),
		courtVines: DS.hasMany('courtVine')
	});


})();