/* global WGN, DS */

(function(){
'use strict';


    WGN.CourtVine = DS.Model.extend({
    	user: DS.belongsTo('user'),
    	court: DS.belongsTo('court'),
  		content: DS.attr('string') // url for vine???
    });


})();