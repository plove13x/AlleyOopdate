/* global WGN, DS */

(function(){
'use strict';


    WGN.CourtVisual = DS.Model.extend({
    	// ADD USER SAME WAY AS COURT
    	court: DS.belongsTo('court'),
    	type: DS.attr('string'), // 'vine' or 'photo'
  		content: DS.attr('string') // url for photo???
    });


})();