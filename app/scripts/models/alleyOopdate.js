/* global WGN, DS */

(function(){
'use strict';


    WGN.AlleyOopdate = DS.Model.extend({  
        user: DS.belongsTo('user', { async: true }),
        court: DS.belongsTo('court'),
        numberPeeps: DS.attr('string'),
        departureGuess: DS.attr('string'),
        alleyOopdateText: DS.attr('string'),
        timestamp: DS.attr('string'),				/* 'date'? */
        verifiedAtCourt: DS.attr('boolean')
    });


})();