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
		    	console.log('Trying to add a court.');
		    	// var self = this;
		    	var courtName = this.get('courtName');
		    	var whenClosed = this.get('whenClosed');
		    	var latitude = this.get('latitude');
		    	var longitude = this.get('longitude');
		    	var court = this.store.createRecord('court', {
					name: courtName,
					whenClosed: whenClosed,
					latitude: latitude,
					longitude: longitude
				});
				court.save();

				this.set('courtName', '');	
				this.set('whenClosed',''); 
				this.set('latitude', ''); 
				this.set('longitude', ''); 

				this.set('isEditing', false);
		    },

		    cancelSubmit: function(){
		    	this.set('isEditing', false);
		    },

		    fetchJSON: function(){
		    	var newAddress = this.get('newAddress');
		    	newAddress = newAddress.replace(/\s+/g, '+');

		    	$.getJSON( 'https://maps.googleapis.com/maps/api/geocode/json?address=' + newAddress + 
		    		'&key=AIzaSyCL3fbgwq4b6nGdezKibSCXF5SfvKJQ-IM', function( data ) {
		    		// console.log(data.results[0].geometry.location.lat);
		    		var newLat = data.results[0].geometry.location.lat;
		    		var newLng = data.results[0].geometry.location.lng;
		    		console.log(newLat, newLng);
		    		
		    	});
		    }
		}
	});


})();