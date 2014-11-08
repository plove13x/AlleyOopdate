/* global Ember, WGN */

(function(){
'use strict';


	WGN.CourtsProfileController = Ember.ObjectController.extend({			/* Object Controller for court to which snapshot being posted to, but array controller to display them all */
		needs: ['session'],
		isPosting: false,
		actions: {
			addSnapshot: function(){
				this.set('isPosting', true);
			},

			postSnapshot: function(){

				var numberPeeps = this.get('numberPeeps');
				var departureGuess = this.get('departureGuess');
		    	var snapshotText = this.get('snapshotText');

				var snapshot = this.store.createRecord('snapshot', {
						numberPeeps: numberPeeps,
						departureGuess: departureGuess,
						snapshotText: snapshotText,
						user: this.get('controllers.session.currentUser'),
						court: this.model
				});
				this.get('model.snapshots').addObject(snapshot);
				snapshot.save();
				this.get('model').save();
				this.set('isPosting', false);
			},

			cancelSnapshot: function(){
				this.set('isPosting', false);
			}
		}
	});



})();