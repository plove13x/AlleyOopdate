/* global Ember, WGN */

(function(){
'use strict';


	WGN.CourtsProfileController = Ember.ObjectController.extend({			/* Object Controller for court to which Alley Oopdate is being posted to, but array controller to display them all */
		needs: ['session'],
		isPosting: false,
		isEditingCourt: false,
		photos: Ember.computed.filterBy('model.courtVisuals', 'type', 'photo'),
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
						timestamp: moment().format('Do MMMM YYYY > h:mm:ss a'),
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
				var otherNotes = this.get('otherNotes');
		    	var newAddress = this.get('address');
		    	var address = newAddress.replace(/\s+/g, '+');

		    	$.getJSON( 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + 
		    		'&key=AIzaSyCL3fbgwq4b6nGdezKibSCXF5SfvKJQ-IM', function( data ) {
		    		// console.log(data.results[0].geometry.location.lat);
		    	}).then(function(data){
		    		var latitude = data.results[0].geometry.location.lat;
		    		var longitude = data.results[0].geometry.location.lng;

					self.store.find('court', self.model.id).then(function(court){				// self.store.update?
						var update = {id: self.model.id, name: courtName, whenClosed: whenClosed, otherNotes: otherNotes, address: newAddress, latitude: latitude,
						longitude: longitude};
	  					self.store.update('court', update);
						// Ember.set(court.get('name'): courtName);
						court.save();
					});

				});

				this.set('isEditingCourt', false);
			},

			cancelCourtProfileUpdate: function(){
				this.set('isEditingCourt', false);
				this.get('model').rollback();
			},

			pickPhotoToUpload: function(){
				filepicker.setKey('AtsLXZDyQjqLWfPEzKhfAz');
				var self = this;
				filepicker.pickAndStore({mimetype:'image/*'},{},function(InkBlobs){
				  	var newCourtPhoto = InkBlobs[0].url;
		        	self.set('newCourtPhoto', newCourtPhoto);
		        	console.log(self.get('newCourtPhoto'));
		        	// console.log(self.avatarUrl);
				    // console.log(JSON.stringify(InkBlobs));
				});
			},

			uploadPhoto: function(){
				var self = this;
				//connect upload to photo NEXT
				var photo = this.store.createRecord('courtPhoto', {
					user: self.get('controllers.session.currentUser'),
					court: self.model,
					content: self.get('newCourtPhoto')
				});

				this.get('model.courtPhotos').addObject(photo);
				// this.get('courtPhotos').addObject(photo);
				photo.save();
				

				// if (self.avatarUrl !== '') {			/* Right now if I hit just update profile w/o an upload it's setting fillmurray */
				// 	this.model.set('avatarUrl', self.avatarUrl);	 /*Perhaps I didn't even need to return a model in router here and just use session controller computed alias...*/ 		
				// }


				this.model.save();
				// this.get('model').save();
				this.set('newCourtPhoto', '');
				// console.log(this.model);
			},

			cancelUploadPhoto: function(){
				this.set('newCourtPhoto', '');
			},

			enterVineUrl: function(){
				var newVineUrl = this.get('newVineUrl');
				var vine = this.store.createRecord('courtVine', {
					user: this.get('controllers.session.currentUser'),
					court: this.model,
					content: newVineUrl+'/embed/simple?audio=1'
				});

				this.get('model.courtVines').addObject(vine);
				// this.get('courtVines').addObject(vine);
				vine.save();
      			this.model.save();
      			// this.get('model').save();
				this.set('newVineUrl', '');
			},


		}
	});



})();