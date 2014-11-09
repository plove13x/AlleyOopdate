/* global WGN, DS */

(function(){
'use strict';


    WGN.Court = DS.Model.extend({
        name: DS.attr('string'),
        address: DS.attr('string'),
        latitude: DS.attr('number'),
      	longitude: DS.attr('number'),
      	location: function(){
        	return this.getProperties('latitude', 'longitude');
      	}.property('latitude', 'longitude'),
      	alleyOopdates: DS.hasMany('alleyOopdate', { async: true }),
        whenClosed: DS.attr('string'),
        otherNotes: DS.attr('string'),
        courtVisuals: DS.hasMany('courtVisual', {embedded: true}),
    });


})();