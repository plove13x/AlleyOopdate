WGN.IndexController = Ember.Controller.extend({
	needs: ['session'],
	actions: {
	    createUser: function(){
			var credentials = this.getProperties('email', 'password');
			var self = this;
			// console.log(self.controllerFor('session').get('currentUser'));

			return new Ember.RSVP.Promise(function(resolve, reject){
          		WGN.ref.createUser(credentials, function(error){
            		if( ! error ){

						WGN.ref.authWithPassword(credentials, function(error, authData){
							var user = self.store.createRecord('user', {
							  id: authData.uid,
							  email: credentials.email
							});
							user.save();
							localStorage.setItem('currentUser', user);
              				self.controllerFor('session').set('currentUser', user);
              				resolve(authData);
              				console.log(authData);
              				// console.log(self.controllerFor('session').get('currentUser'));
						});

            		}
            	});
	        });
	    },
	},
});