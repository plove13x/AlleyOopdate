WGN.IndexController = Ember.Controller.extend({
	needs: ['session'],
	actions: {
	    createUser: function(){
			var credentials = this.getProperties('email', 'password');
			var self = this;
			var handle = this.get('handle');

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
              				resolve(authData);
              				// self.transitionToRoute('courts');	 Will be reg. success page tho!
						});

            		}
            	});
          		// self.set('email', '');	
          		// self.set('password','');
          		// self.set('handle', '');
	        });
	    },
	},
});