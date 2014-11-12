/* global WGN, DS */

(function(){
'use strict';


    WGN.AlleyOopdate = DS.Model.extend({  
        user: DS.belongsTo('user', { async: true }),
        court: DS.belongsTo('court'),
        verifiedAtCourt: DS.attr('boolean'),
        numberPeeps: DS.attr('string'),
        arrivalTime: DS.attr('string'),
        departureGuess: DS.attr('string'),
        convoyQty: DS.attr('string'),
        alleyOopdateText: DS.attr('string'),
        timestamp: DS.attr('string')				/* 'date'? */
    });


})();