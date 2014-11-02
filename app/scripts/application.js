(function(){
'use strict';

window.WGN = Ember.Application.create();

WGN.ref = new Firebase('https://whosgotnext.firebaseio.com/');

WGN.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: WGN.ref
});


})();