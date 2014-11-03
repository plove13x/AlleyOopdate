/* global Ember, WGN */

(function(){
'use strict';


	WGN.WelcomeController = Ember.Controller.extend({
		actions: {
		    proceedToCourts: function(){
		    	this.transitionToRoute('courts');	
		    }
		}
	});


})();