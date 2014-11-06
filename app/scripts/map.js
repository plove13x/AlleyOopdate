/* global Ember, WGN, filepicker */

// (function(){
'use strict';


var map;

// Set the center as Firebase HQ
var locations = {
  "FirebaseHQ": [37.785326, -122.405696],
  "Caltrain": [37.7789, -122.3917]
};
var center = locations["FirebaseHQ"];

var radiusInKm = 0.5;



function initializeMap() {
  // Get the location as a Google Maps latitude-longitude object
  var loc = new google.maps.LatLng(center[0], center[1]);

  // Create the Google Map
  map = new google.maps.Map(document.getElementById("pinnedMap"), {
    center: loc,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create a draggable circle centered on the map
  var circle = new google.maps.Circle({
    strokeColor: "#6D3099",
    strokeOpacity: 0.7,
    strokeWeight: 1,
    fillColor: "#B650FF",
    fillOpacity: 0.35,
    map: map,
    center: loc,
    radius: ((radiusInKm) * 1000),
    draggable: true
  });

};


// window.map_callback = function() {
// 	var self = this;
//     self.initializeMap();
// };


// var objectz = document.getElementById("pinnedMap");



 // })();