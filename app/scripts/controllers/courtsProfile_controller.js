/* global Ember, WGN */

(function(){
'use strict';


	WGN.CourtsProfileController = Ember.ObjectController.extend({			/* Object Controller for court to which Alley Oopdate is being posted to, but array controller to display them all */
		needs: ['session', 'courts'],
		isPosting: false,
		isVerified: false,
		isEditingCourt: false,
		photos: Ember.computed.filterBy('model.courtVisuals', 'type', 'photo'),
		Haversine: function(){

				var self = this;
				Number.prototype.toRad = function() {
				   return this * Math.PI / 180;
				};

				var lat2 = 42.741;
				var lon2 = -71.3161;
				var lat1 = 42.806911;
				var lon1 = -71.290611;

				lat1 = this.get('model.latitude');
				lon1 = this.get('model.longitude');
				
				lat2 = +localStorage.getItem('userCoords.lat');
				lon2 = +localStorage.getItem('userCoords.lon');

				// lat2 = this.get('localStorage.userCoords[0]');
				// lon2 = this.get('localStorage.userCoords[1]');
				console.log(localStorage);
				console.log(localStorage.getItem('userCoords.lat'));
				console.log(localStorage.getItem('userCoords.lon'));

				var R = 6371; // km
				//has a problem with the .toRad() method below.
				var x1 = lat2-lat1;
				var dLat = x1.toRad();
				var x2 = lon2-lon1;
				var dLon = x2.toRad();
				var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1.toRad()) 
				* Math.cos(lat2.toRad()) 
				* Math.sin(dLon/2) 
				* Math.sin(dLon/2);
				var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
				var d = R * c;

				console.log(d);
				return d;

		},

		actions: {
			addAlleyOopdate: function(){
				this.set('isPosting', true);
				var proximityToCourt = this.Haversine();
			    console.log(proximityToCourt);
			    if (proximityToCourt <= 1) {
			    	this.set('isVerified', true);
			    	alert('VERIFIED: at the court!');
			    } else {
			    	this.set('isVerified', false);
			    };
			},

			postAlleyOopdate: function(){
				var numberPeeps = this.get('numberPeeps');
				var arrivalTime = this.get('arrivalTime');
				var departureGuess = this.get('departureGuess');
		    	var alleyOopdateText = this.get('alleyOopdateText');
		    	var convoyQty = this.get('convoyQty');

				var alleyOopdate = this.store.createRecord('alleyOopdate', {
						user: this.get('controllers.session.currentUser'),
						court: this.model,
						verifiedAtCourt: this.get('isVerified'),
						numberPeeps: numberPeeps,
						arrivalTime: arrivalTime,
						departureGuess: departureGuess,
						convoyQty: convoyQty,
						alleyOopdateText: alleyOopdateText,
						timestamp: moment().format('Do MMMM YYYY > h:mm:ss a')
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
			}

		}
	});



})();