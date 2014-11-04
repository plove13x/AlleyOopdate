/* global Ember, WGN */

(function(){
'use strict';


	WGN.initializer({
		name: 'preload',
		initialize: function(container){
			var fToken = localStorage.getItem('firebaseToken');
			if (fToken) {
				WGN.deferReadiness();
				var store = container.lookup('store:main');
				var seshController = container.lookup('controller:session');
				console.log(1);
				WGN.ref.authWithCustomToken(fToken, function(error, authData){
					if ( ! error ) {
						console.log(2);
						store.find('user', authData.uid).then(function(user){

							seshController.set('currentUser', user);
							console.log(3);
							// localStorage.setItem('currentUser', user);		/* UNNECESSARY? */
							WGN.advanceReadiness();

							// self.set('email', '');	
							// self.set('password','');

							// resolve(authData);
							// self.transitionToRoute('courts');	
						});
					} else {
						console.log('no Token!');
					}
				});	
			}
		}				
			// } else {
			// 	console.log('login');
			// }
		
	});


})();