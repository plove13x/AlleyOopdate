/* global Ember, WGN, filepicker */

(function(){
'use strict';


	WGN.EditProfileController = Ember.Controller.extend({
	/* MAKING THIS AN OBJECT CONTROLLER WOULD MAKE THE CONTROLLER PROPERTIES TAKE PRECEDENCE OVER THE MODEL PROPERTIES WHEN APPLICABLE */
		// needs: ['session'],
		// currentUser: Ember.computed.alias('controllers.session.currentUser'),

		avatarUrl: '',
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
				if (self.avatarUrl !== '') {						// HOOK UP CONTROLLER? Right now if I hit just update profile w/o an upload it's setting fillmurray 
					this.model.set('avatarUrl', self.avatarUrl);	// Perhaps I didn't even need to return a model in router here and just use session controller computed alias... 		
				}
				this.model.save();
				this.transitionToRoute('courts');
				// console.log(this.model);



				// var handle = this.get('handle');
				// if (self.avatarUrl !== '') {			
				// 	var avatarUrl = this.get('avatarUrl');			
				// }

				// // WOULD ALSO NEED IF AVATAR HAS CHANGED STATEMENT BEFORE RUNNING THE UPDATE ON AVATARURL! COULD SET A CONTROLLER "HAS CHANGED" PROPERTY...

				// self.store.find('user', self.model.id).then(function(user){
				// 	var updateEvent = {id: self.model.id, handle: handle, avatarUrl: avatarUrl};
  		// 			self.store.update('user', updateEvent);
				// 	// Ember.set(court.get('name'): courtName);
				// 	user.save();
				// });
				// this.transitionToRoute('courts');


			},

			doNotUpdate: function(){
				var self = this;
				self.set('avatarUrl', '');
				this.transitionToRoute('courts');
			}
		}
	});


})();