/* global Ember, WGN */

(function(){
'use strict';


	WGN.CourtsController = Ember.ArrayController.extend({
		needs: ['session'],
		currentUser: Ember.computed.alias('controllers.session.currentUser'),
		isEditing: false,
		actions: {
			drawCourt: function(){
				this.set('isEditing', true);
			},

		    submitCourt: function(){
		    	var self = this;
		    	var courtName = this.get('courtName');
		    	var whenClosed = this.get('whenClosed');
		    	var newAddress = this.get('newAddress');
		    	var address = newAddress.replace(/\s+/g, '+');

		    	$.getJSON( 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 
		    		'&key=AIzaSyCL3fbgwq4b6nGdezKibSCXF5SfvKJQ-IM', function( data ) {
		    		// console.log(data.results[0].geometry.location.lat);
		    	}).then(function(data){
		    		var latitude = data.results[0].geometry.location.lat;
		    		var longitude = data.results[0].geometry.location.lng;
			    	var court = self.store.createRecord('court', {
						name: courtName,
						address: newAddress,
						latitude: latitude,
						longitude: longitude,
						whenClosed: whenClosed
					});
					court.save();
		    	});

				this.set('courtName', '');	
				this.set('whenClosed',''); 
				this.set('newAddress', '');

				this.set('isEditing', false);
		    },

		    cancelSubmit: function(){
		    	this.set('isEditing', false);
		    },

		}
	});


})();