/* global Ember, WGN, google */
		

(function(){
'use strict';


	WGN.CourtsView = Ember.View.extend({

		mapListeners: [],

		didInsertElement: function() {
		    this._super();
		    this.getUserCoords();
		},

		userCoords: [],
		coordsInUse: [],

		radiusInKm: 8,

		getUserCoords: function(){
			var self = this;
			navigator.geolocation.getCurrentPosition(function(position){
				var testLat = position.coords.latitude;
				var testLng = position.coords.longitude;
				var userCoords = [testLat, testLng];
				self.set('userCoords', userCoords);	
				self.set('coordsInUse', userCoords);			/* check to make sure controller is still there */

				localStorage.setItem('userCoords.lat', testLat);
				localStorage.setItem('userCoords.lon', testLng);
				// self.set(localStorage.userCoords, userCoords);
				self.initializeGQ();
				self.initializeMap();
			});
		},

		initializeGQ: function() {
			// Create a new GeoQuery instance
			var center = this.get('coordsInUse');
			var radiusInKm = this.get('radiusInKm');
			this.set('courtsInQuery', {});

			var geoQuery = WGN.geoFire.query({
				center: center,
				radius: radiusInKm
			});
			this.set('geoQuery', geoQuery);
			geoQuery.on('key_entered', this.addCourtToMap.bind(this));
			geoQuery.on('key_exited', this.removeCourtFromMap.bind(this));
		},

		initializeMap: function() {

			var map;
			var center = this.get('coordsInUse');
			var radiusInKm = this.get('radiusInKm');					/* was 0.5. 1? */

			/*****************/
			/*  GOOGLE MAPS  */
			/*****************/

			// Get the location as a Google Maps latitude-longitude object
			var mapCenter = new google.maps.LatLng(center[0], center[1]);

			// Create the Google Map
			map = new google.maps.Map(document.getElementById('pinnedMap'), {			/* TODO Use ember get view's element */
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

			this.set('circle', circle);

			//Update the query's criteria every time the circle is dragged
			var listener = google.maps.event.addListener(circle, 'drag', this.updateCriteria.bind(this));
			this.get('mapListeners').push(listener);
		},

		updateCriteria: _.debounce(function() {
			var circle = this.get('circle');
			var latLng = circle.getCenter();
			this.get('geoQuery').updateCriteria({
				center: [latLng.lat(), latLng.lng()],
				radius: this.get('radiusInKm')
			});
		}, 10),

		addCourtToMap: function(courtId, courtLocation) {
				// Specify that the court has entered this query
				var self = this;
				var courtsInQuery = this.get('courtsInQuery');	
				courtId = courtId.split(':')[1];
				courtsInQuery[courtId] = true;

					// Look up the court's data in the Transit Open Data Set
					WGN.ref.child('courts').child(courtId).once('value', function(dataSnapshot) {
						// Get the court data from the Open Data Set
						var court = dataSnapshot.val();						/* I ADDED THIS VAR!!!!! */
						court.id = courtId;
						// If the court has not already exited this query in the time it took to look up its data in the Open Data
						// Set, add it to the map
						if (court !== null && courtsInQuery[courtId] === true) {
							// Add the court to the list of courts in the query
							courtsInQuery[courtId] = court;


							// right now, its just id for court is true. instead, id should be model. 
							// instead of just on view, also set courtsinQuery on controller.


							// Create a new marker for the court
							// court.marker = createCourtMarker(court, getCourtColor(court));
							court.marker = self.createCourtMarker(court);
						}
					});
		},

		removeCourtFromMap: function(courtId, courtLocation) {
				// Get the court from the list of courts in the query
				courtId = courtId.split(':')[1];
				var courtsInQuery = this.get('courtsInQuery');
				var court = courtsInQuery[courtId];

				// If the court's data has already been loaded from the Open Data Set, remove its marker from the map
				if (court !== true) {
					court.marker.setMap(null);
				}

				// Remove the court from the list of courts in the query
				delete courtsInQuery[courtId];
		},

		/* Adds a marker for the inputted court to the map */						/* see if this is getting called w/o refresh!!! could just be not rendering to DOM */
		createCourtMarker: function(court) {
			var map = this.get('map');
			var marker = new google.maps.Marker({
				// icon: "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=" + vehicle.vtype + "|bbT|" + vehicle.routeTag + "|" + vehicleColor + "|eee",
				icon: 'https://31.media.tumblr.com/avatar_fe3197bc5e11_48.png',
				// icon: '/images/bball-hoop-256.png',
				position: new google.maps.LatLng(court.latitude, court.longitude),
				optimized: true,
				map: map,
				clickable: true,
				// anchorPoint: (x:2, y:4)
			});

			var self = this;
			var listener = google.maps.event.addListener(marker, 'click', function(){
				self.get('controller').transitionToRoute('/courts/'+court.id);
			});
			this.get('mapListeners').push(listener);

		    return marker;
		},

		updateMapCenter: function(){
			var map = this.get('map');
			var coords = this.get('coordsInUse');
			var center = new google.maps.LatLng(coords[0], coords[1]);
			map.setCenter(center);
			var circle = this.get('circle');
			circle.setCenter(center);
		},

		willDestroyElement: function() {
			this.get('mapListeners').forEach(function(l){
				google.maps.event.removeListener(l);
			});
			this.set('mapListeners', []);
			this.geoQuery.cancel();
			this.set('map', null);
			this.set('controller.searchCoords', null);
		},

		searchQueryChanged: function() {
			var searchCoords = this.get('controller.searchCoords');
			if (searchCoords) {
				this.set('coordsInUse', searchCoords);
				// google.maps.event.clearInstanceListeners($('#pinnedMap'));
				// ($('#pinnedMap')).html('');
				this.updateMapCenter();
				this.updateCriteria();
			}			
		}.observes('controller.searchCoords'),

	});


})();
