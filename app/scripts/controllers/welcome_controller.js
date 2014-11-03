WGN.WelcomeController = Ember.Controller.extend({
	actions: {
	    proceedToCourts: function(){
	    	this.transitionToRoute('courts');	
	    }
	}
});