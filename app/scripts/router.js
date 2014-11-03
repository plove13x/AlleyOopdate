// $(document).ready(function(){
'use strict';

// var self = this;

WGN.Router.map(function(){
	this.route('index', {path: '/'});
	this.route('welcome', {path:'/welcome'});
	this.resource('courts', {path:'/courts'});
});

WGN.IndexRoute = Ember.Route.extend({

});

// });