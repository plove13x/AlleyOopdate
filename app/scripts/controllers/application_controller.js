WGN.ApplicationController = Ember.Controller.extend({
	needs: ['session'],
	currentUser: Ember.computed.alias('controllers.session.currentUser'),
	actions: {
	    signOut: function(){
	    	console.log('Trying to sign you out...');
			localStorage.setItem('currentUser', null);
			this.set('controllers.session.currentUser', null);
			this.transitionToRoute('index');
	    }
	}
});