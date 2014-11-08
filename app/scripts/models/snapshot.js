/* global WGN, DS */

(function(){
'use strict';


    WGN.Snapshot = DS.Model.extend({  
        user: DS.belongsTo('user'),
        court: DS.belongsTo('court'),
        numberPeeps: DS.attr('string'),
        departureGuess: DS.attr('string'),
        snapshotText: DS.attr('string'),
        verifiedAtCourt: DS.attr('boolean')
    });


})();