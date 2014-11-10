/* global WGN, DS */

(function(){
'use strict';


    WGN.CourtVisual = DS.Model.extend({
    	user: DS.belongsTo('user'),
    	court: DS.belongsTo('court'),
    	type: DS.attr('string'), // 'vine' or 'photo'
  		content: DS.attr('string') // url for photo???
    });


})();