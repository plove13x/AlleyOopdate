/* global Ember, WGN */

(function(){
'use strict';


	WGN.SessionController = Ember.Controller.extend({
		currentUser: null,
		userCoords: null,
		// authenticate: function(credentials){
		// 	var self = this;
		// 	return new Ember.RSVP.Promise(function(resolve, reject){
		// 		WGN.ref.authWithPassword(credentials, function(error, authData){
		// 			self.store.find('user', authData.uid).then(function(user){
		// 				// if ( ! error ) {
		// 					self.set('currentUser', user);
		// 					localStorage.setItem('currentUser', user);
		// 					resolve(authData);					
		// 				// }
		// 			});
		// 		});
		// 	});
		// }
	});


})();