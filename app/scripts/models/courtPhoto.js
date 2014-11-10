/* global WGN, DS */

(function(){
'use strict';


    WGN.CourtPhoto = DS.Model.extend({
    	user: DS.belongsTo('user'),
    	court: DS.belongsTo('court'),
  		content: DS.attr('string') // url for photo???
    });


})();