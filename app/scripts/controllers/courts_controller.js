/* global Ember, WGN */

(function(){
'use strict';


	WGN.CourtsController = Ember.ArrayController.extend({
		needs: ['session', 'courtsProfile'], 
		currentUser: Ember.computed.alias('controllers.session.currentUser'),
		isAddingCourt: false,
		searchCoords: null,
		// sortAscending: true,
  		// sortProperties: ['name'],
		courtFilter: '',

		filteredContent: function() {
			var regExp = new RegExp(this.get('courtFilter').toLowerCase());
				return this.get('content').filter(function(item) {
		  		return regExp.test(item.get('name').toLowerCase());
			});
		}.property('courtFilter', 'model.@each'),


		actions: {

			updateQueryLocation: function(){
				var newSearch = this.get('newSearchLocation');
				newSearch = newSearch.replace(/\s+/g, '+');
				var self = this;

				$.getJSON( 'https://maps.googleapis.com/maps/api/geocode/json?address=' + newSearch + 
		    		'&key=AIzaSyCL3fbgwq4b6nGdezKibSCXF5SfvKJQ-IM', function( data ) {
		    		// console.log(data.results[0].geometry.location.lat);
		    	}).then(function(data){
		    		var latitude = data.results[0].geometry.location.lat;
		    		var longitude = data.results[0].geometry.location.lng;
		    		self.set('searchCoords', [latitude, longitude]);
		    	});
			},

			drawCourt: function(){
				this.set('isAddingCourt', true);
			},

		    submitCourt: function(){
		    	var self = this;
		    	var courtName = this.get('courtName');
		    	var whenClosed = this.get('whenClosed');
		    	var otherNotes = this.get('otherNotes');
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
						whenClosed: whenClosed,
						otherNotes: otherNotes
					});
					court.save().then(function(){
						WGN.geoFire.set('court:'+court.get('id'), [latitude, longitude]).then(function() {
								console.log('Provided key has been added to GeoFire');
							}, function(error) {
								console.log('Error: ' + error);
							});
					});
		    	});

				this.set('courtName', '');	
				this.set('whenClosed','');
				this.set('otherNotes', ''); 
				this.set('newAddress', '');

				this.set('isAddingCourt', false);
		    },

		    cancelSubmit: function(){
		    	this.set('isAddingCourt', false);
		    },
  

		    // filteredContent : function() {
		    //     var searchText = this.get('searchText'), regex = new RegExp(searchText, 'i');

		    //     return this.model.filter(function(item) {
		    //         return regex.test(item.name);
		    //     });
		    // }.property('searchText', 'model')

		}
	});


})();