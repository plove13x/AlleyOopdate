/* global WGN, DS */

(function(){
'use strict';


    WGN.Snapshot = DS.Model.extend({  
        user: DS.belongsTo('user'),
        court: DS.belongsTo('court'),
        snapshotText: DS.attr('string'),
        verifiedAtCourt: DS.attr('boolean')
    });


})();