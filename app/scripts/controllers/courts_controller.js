/* global Ember, WGN */

(function(){
'use strict';


	WGN.CourtsController = Ember.Controller.extend({
		needs: ['session'],
		currentUser: Ember.computed.alias('controllers.session.currentUser'),
		actions: {
		    createCourt: function(){
		    	console.log('Trying to add a court.');
		    	// var self = this;
		    	var courtName = this.get('courtName');
		    	var whenClosed = this.get('whenClosed');
		    	var court = this.store.createRecord('court', {
					name: courtName,
					whenClosed: whenClosed,
					latitude: 2,
					longitude: 3
				});
				court.save();
		    }
		}
	});


})();