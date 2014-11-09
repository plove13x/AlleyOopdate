/* global Ember, WGN */

(function(){
'use strict';


	WGN.CourtsProfileController = Ember.ObjectController.extend({			/* Object Controller for court to which Alley Oopdate is being posted to, but array controller to display them all */
		needs: ['session'],
		isPosting: false,
		isEditingCourt: false,
		actions: {
			addAlleyOopdate: function(){
				this.set('isPosting', true);
			},

			postAlleyOopdate: function(){

				var numberPeeps = this.get('numberPeeps');
				var departureGuess = this.get('departureGuess');
		    	var alleyOopdateText = this.get('alleyOopdateText');

				var alleyOopdate = this.store.createRecord('alleyOopdate', {
						numberPeeps: numberPeeps,
						departureGuess: departureGuess,
						alleyOopdateText: alleyOopdateText,
						timestamp: moment(),
						user: this.get('controllers.session.currentUser'),
						court: this.model
				});
				this.get('model.alleyOopdates').addObject(alleyOopdate);
				alleyOopdate.save();
				this.get('model').save();
				this.set('isPosting', false);
			},

			cancelAlleyOopdate: function(){
				this.set('isPosting', false);
			},

			editCourt: function(){
				this.set('isEditingCourt', true);
				console.log('true', this.model);
			},

			updateCourt: function(){
				var self = this;
				var courtName = this.get('name');

				var whenClosed = this.get('whenClosed');
		    	var newAddress = this.get('address');
		    	var address = newAddress.replace(/\s+/g, '+');

		    	$.getJSON( 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 
		    		'&key=AIzaSyCL3fbgwq4b6nGdezKibSCXF5SfvKJQ-IM', function( data ) {
		    		// console.log(data.results[0].geometry.location.lat);
		    	}).then(function(data){
		    		var latitude = data.results[0].geometry.location.lat;
		    		var longitude = data.results[0].geometry.location.lng;

					self.store.find('court', self.model.id).then(function(court){
						var updateEvent = {id: self.model.id, name: courtName, whenClosed: whenClosed, address: newAddress, latitude: latitude,
						longitude: longitude};
	  					self.store.update('court', updateEvent);
						// Ember.set(court.get('name'): courtName);
						court.save();
					});

				});

				this.set('isEditingCourt', false);
			},
		}
	});



})();