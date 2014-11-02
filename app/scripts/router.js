// $(document).ready(function(){
'use strict';

// var self = this;

WGN.Router.map(function(){
	this.route('index', {path: '/'});
	this.resource('courts', {path:'/courts'});
});

WGN.IndexRoute = Ember.Route.extend({

});

// });