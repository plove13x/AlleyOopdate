/* global Ember, WGN */


// $(document).ready(function(){
(function(){
'use strict';


	// var self = this;



	// 
	WGN.Router.map(function(){
		this.route('index', {path: '/'});
		this.route('welcome', {path:'/welcome'});
		this.route('editProfile', {path:'/editProfile'});
		this.resource('courts', function(){
			this.route('profile', {path: ':court_id'});
		});
	});

	WGN.IndexRoute = Ember.Route.extend({

	});

	WGN.EditProfileRoute = Ember.Route.extend({
		model: function(){
			// return this.store.find('user', localStorage.getItem('currentUser').id;
			return this.store.find('user', this.controllerFor('session').get('currentUser').id);
			// return this.store.find('user', this.get('controllers.session.currentUser').id);
		},

		setupController: function(controller, model){
    		this._super(controller, model);
    		controller.set('avatarUrl', null);
    	}
	});

	WGN.CourtsRoute = Ember.Route.extend({
		model: function(){
			return this.store.find('court');
		},

	});

})();
// });