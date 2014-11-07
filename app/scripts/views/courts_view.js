/* global Ember, WGN, google */
		

(function(){
'use strict';


	WGN.CourtsView = Ember.View.extend({

		didInsertElement: function() {
		    this._super();
		    this.getUserCoords();
		    // this.initializeMap();
		},

		userCoords: [32.830849, -96.769813],


		getUserCoords: function(){
			var self = this;
			navigator.geolocation.getCurrentPosition(function(position){
				var testLat = position.coords.latitude;
				var testLng = position.coords.longitude;
				var userCoords = [testLat, testLng];
				console.log(testLat);
				self.set('userCoords', userCoords);				/* check to make sure controller is still there */
				self.initializeMap();
			});
		},

		initializeMap: function() {

			var map;

			// Set the center as Granada Theater
			var locations = {
			  'TietzePark': [32.823454, -96.761275],
			  'GranadaTheater': [32.830849, -96.769813],
			};
			// var center = locations['GranadaTheater'];
			var center = this.get('userCoords');

			var radiusInKm = 8;					/* was 0.5. 1? */


			/*************/
			/*  GEOQUERY */
			/*************/
			var courtsInQuery = {};

			// Create a new GeoQuery instance
			var geoQuery = WGN.geoFire.query({
				center: center,
				radius: radiusInKm
			});

			var self = this;
			self.set('geoQuery', geoQuery);

			geoQuery.on('key_entered', function(courtId, courtLocation) {
				console.log('key_entered fired');
				// Specify that the court has entered this query
				courtId = courtId.split(":")[1];
				courtsInQuery[courtId] = true;

					// Look up the court's data in the Transit Open Data Set
					WGN.ref.child("courts").child(courtId).once("value", function(dataSnapshot) {
						// Get the court data from the Open Data Set
						var court = dataSnapshot.val();						/* I ADDED THIS VAR!!!!! */
						court.id = courtId;
						// If the court has not already exited this query in the time it took to look up its data in the Open Data
						// Set, add it to the map
						if (court !== null && courtsInQuery[courtId] === true) {
							// Add the court to the list of courts in the query
							courtsInQuery[courtId] = court;

							// Create a new marker for the court
							// court.marker = createCourtMarker(court, getCourtColor(court));
							court.marker = createCourtMarker(court);
							// console.log(court);
							// console.log(court.marker);
						}

					});

			});


			/* Removes court markers from the map when they exit the query */
			geoQuery.on('key_exited', function(courtId, courtLocation) {
				// Get the court from the list of courts in the query
				courtId = courtId.split(":")[1];
				var court = courtsInQuery[courtId];

				// If the court's data has already been loaded from the Open Data Set, remove its marker from the map
				if (court !== true) {
					court.marker.setMap(null);
				}

				// Remove the court from the list of courts in the query
				delete courtsInQuery[courtId];
			});



			/*****************/
			/*  GOOGLE MAPS  */
			/*****************/		
			// Get the location as a Google Maps latitude-longitude object
			var mapCenter = new google.maps.LatLng(center[0], center[1]);

			// Create the Google Map
			map = new google.maps.Map(document.getElementById('pinnedMap'), {			/* Use ember get view's element */
				center: mapCenter,
				zoom: 12,							/* Was 15. 13? */
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			this.set('map', map);	

			// Create a draggable circle centered on the map
			var circle = new google.maps.Circle({
				strokeColor: '#6D3099',
				strokeOpacity: 0.7,
				strokeWeight: 1,
				fillColor: '#B650FF',
				fillOpacity: 0.35,
				map: map,
				center: mapCenter,
				radius: ((radiusInKm) * 1000),		/* Was 1000. 7500? */
				draggable: true
			});

			//Update the query's criteria every time the circle is dragged
			var updateCriteria = _.debounce(function() {
				var latLng = circle.getCenter();
				geoQuery.updateCriteria({
			  		center: [latLng.lat(), latLng.lng()],
			  		radius: radiusInKm
				});
			}, 10);
			google.maps.event.addListener(circle, "drag", updateCriteria);				/* use ember dom event for drag */

			var self = this;
			/**********************/
			/*  HELPER FUNCTIONS  */
			/**********************/
			/* Adds a marker for the inputted court to the map */						/* see if this is getting called w/o refresh!!! could just be not rendering to DOM */
			// function createCourtMarker(court, courtColor) {
			function createCourtMarker(court) {
				// console.log(court);
				// console.log(court.latitude);
				console.log('createCourtMarker', map);
				var marker = new google.maps.Marker({
					// icon: "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=" + vehicle.vtype + "|bbT|" + vehicle.routeTag + "|" + vehicleColor + "|eee",
					icon: 'https://31.media.tumblr.com/avatar_fe3197bc5e11_48.png',
					position: new google.maps.LatLng(court.latitude, court.longitude),
					optimized: true,
					map: map,
					clickable: true,
					click: console.log('test')
					// anchorPoint: (x:2, y:4)
			  	});

				
			  	google.maps.event.addListener(marker, "click", function(){
			  		console.log(self.get('controller'));
			  		self.get('controller').transitionToRoute('/courts/'+court.id);
			  		console.log(court);
			  	});

			    return marker;
			}
		
		},

		willDestroyElement: function() {
			var self = this;
			console.log('no');
			self.geoQuery.cancel();
			this.set('map', null);
		},


		searchQueryChanged: function() {
			var searchCoords = this.get('controller.searchCoords');
			// this.set('userCoords', searchCoords);
			if (searchCoords) {
				console.log(searchCoords);

				this.set('userCoords', searchCoords);
				console.log(this.get('userCoords'));
				console.log(this.geoQuery);

				// google.maps.event.clearInstanceListeners($('#pinnedMap'));
				// this.geoQuery.cancel();
				// document.getElementById('pinnedMap').innerHTML = "";
				if (this.get('geoQuery')) {
					this.get('geoQuery').cancel();
				}
				console.log(this.geoQuery);
				// ($('#pinnedMap')).html('');
				this.initializeMap();
				console.log(this.map);

			};			
			// console.log(searchCoords);
		}.observes('controller.searchCoords'),

		// loadGoogleMapsScript: function(){

		// 	var self = this;
		// 	window.map_callback = function() {
		// 	    self.initializeMap();
		// 	}
		// 	window.map_callback();
		// }

	});


})();