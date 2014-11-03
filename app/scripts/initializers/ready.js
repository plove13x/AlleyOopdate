/* global Ember, WGN */

(function(){
'use strict';


	WGN.initializer({
		name: 'third',
		after: 'debug',
		initialize: function() {
			Ember.debug('third called!'); 
		}	
	});

	WGN.initializer({
		name: 'first',
		before: 'debug',
		initialize: function() {
			Ember.debug('first called!');
		}
	});

	var called = false;
	WGN.initializer({
		name: 'debug',
		initialize: function() {
			Ember.debug('second called!');
			called = true;
		}
	});

	WGN.ready = function() {
		Ember.debug(called); //prints true
	};


})();