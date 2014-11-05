/* global Ember, WGN, filepicker */

(function(){
'use strict';


	WGN.EditProfileController = Ember.Controller.extend({
	/* MAKING THIS AN OBJECT CONTROLLER WOULD MAKE THE CONTROLLER PROPERTIES TAKE PRECEDENCE OVER THE MODEL PROPERTIES WHEN APPLICABLE */
		// needs: ['session'],
		// currentUser: Ember.computed.alias('controllers.session.currentUser'),

		actions: {

			addAvatar: function(){
				var self = this;
				filepicker.pickAndStore({mimetype:'image/*'},{},function(InkBlobs){
				  	var avatarUrl = InkBlobs[0].url;
		        	self.set('avatarUrl', avatarUrl);
		        	// console.log(self.avatarUrl);
				    // console.log(JSON.stringify(InkBlobs));
				});
			},

			updateProfile: function(){
				var self = this;
				if (self.avatarUrl !== '') {			/* Right now if I hit just update profile w/o an upload it's setting fillmurray */
					this.model.set('avatarUrl', self.avatarUrl);	/* Perhaps I didn't even need to return a model in router here and just use session controller computed alias... */		
				}
				this.model.save();
				this.transitionToRoute('courts');
				// console.log(this.model);
			},

			doNotUpdate: function(){
				var self = this;
				self.set('avatarUrl', null);
				this.transitionToRoute('courts');
			}
		}
	});


})();