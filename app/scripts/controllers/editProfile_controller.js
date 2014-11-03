/* global Ember, WGN */

(function(){
'use strict';


	WGN.EditProfileController = Ember.Controller.extend({
		needs: ['session'],
		currentUser: Ember.computed.alias('controllers.session.currentUser'),
		actions: {
			updateProfile: function(){
				this.transitionToRoute('courts');
				console.log(this.model);
			}
		}
	});


})();