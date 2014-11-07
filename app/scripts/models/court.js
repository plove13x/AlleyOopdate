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
      	snapshots: DS.hasMany('snapshot', { async: true }),
        whenClosed: DS.attr('string'),
        otherNotes: DS.attr('string'),
        // visuals: DS.hasMany('attachment', {embedded: true}),
    });


})();