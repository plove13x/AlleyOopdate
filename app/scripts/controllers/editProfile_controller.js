/* global Ember, WGN */

(function(){
'use strict';


	WGN.EditProfileController = Ember.Controller.extend({
		needs: ['session'],
		currentUser: Ember.computed.alias('controllers.session.currentUser'),

		actions: {

			addAvatar: function(){
				var self = this;
				filepicker.pickAndStore({mimetype:"image/*"},{},function(InkBlobs){
				  	var avatarUrl = InkBlobs[0].url;
		        	self.set('avatarUrl', avatarUrl)
		        	// console.log(self.avatarUrl);
				    // console.log(JSON.stringify(InkBlobs));
				});
			},

			updateProfile: function(){
				var self = this;
				if (self.avatarUrl !== '') {
					this.model.set('avatarUrl', self.avatarUrl);			
				}
				this.model.save();
				this.transitionToRoute('courts');
				// console.log(this.model);
			},

			doNotUpdate: function(){
				var self = this;
				self.set('avatarUrl', '');
				this.transitionToRoute('courts');
			}
		}
	});


})();