/* global Ember, WGN */

(function(){
'use strict';


	WGN.IndexController = Ember.Controller.extend({
		needs: ['session'],
		actions: {
		    createUser: function(){
				var newUserCred = this.getProperties('emailNU', 'passwordNU');
				var credentials = {email: newUserCred.emailNU, password: newUserCred.passwordNU};
				var self = this;
				var handle = this.get('handleNU');

				return new Ember.RSVP.Promise(function(resolve, reject){
	          		WGN.ref.createUser(credentials, function(error){
	            		if( ! error ){

							WGN.ref.authWithPassword(credentials, function(error, authData){
								var user = self.store.createRecord('user', {
								  id: authData.uid,
								  email: credentials.email,
								  handle: handle,
								});
								user.save();
								localStorage.setItem('currentUser', user);
	              				self.set('controllers.session.currentUser', user);
	              				// console.log(self.get('controllers.session.currentUser'));
	              				
	              				self.set('emailNU', '');	
								self.set('passwordNU','');
								self.set('handleNU', '');

	              				resolve(authData);
	              				self.transitionToRoute('welcome');	 
							});

	            		} else {
	            			console.log('error!');
	            		}
	            	});
		        });
		    },
		    signIn: function(){
		    	var credentials = this.getProperties('email', 'password');
		    	var self = this;
					return new Ember.RSVP.Promise(function(resolve, reject){
						WGN.ref.authWithPassword(credentials, function(error, authData){
							if ( ! error ) {
								self.store.find('user', authData.uid).then(function(user){
									self.set('controllers.session.currentUser', user);
									localStorage.setItem('currentUser', user);

									self.set('email', '');	
									self.set('password','');

									resolve(authData);
									self.transitionToRoute('courts');	
								});
							} else {
								console.log('error!');
							}
						});	
					});
		    }
		},
	});


})();