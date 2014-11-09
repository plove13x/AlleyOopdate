/* global Ember, WGN */

(function(){
'use strict';


	WGN.CourtsProfileController = Ember.ObjectController.extend({			/* Object Controller for court to which Alley Oopdate is being posted to, but array controller to display them all */
		needs: ['session'],
		isPosting: false,
		isEditingCourt: false,
		actions: {
			addAlleyOopdate: function(){
				this.set('isPosting', true);
			},

			postAlleyOopdate: function(){

				var numberPeeps = this.get('numberPeeps');
				var departureGuess = this.get('departureGuess');
		    	var alleyOopdateText = this.get('alleyOopdateText');

				var alleyOopdate = this.store.createRecord('alleyOopdate', {
						numberPeeps: numberPeeps,
						departureGuess: departureGuess,
						alleyOopdateText: alleyOopdateText,
						timestamp: Date.now(),
						user: this.get('controllers.session.currentUser'),
						court: this.model
				});
				this.get('model.alleyOopdates').addObject(alleyOopdate);
				alleyOopdate.save();
				this.get('model').save();
				this.set('isPosting', false);
			},

			cancelAlleyOopdate: function(){
				this.set('isPosting', false);
			},

			editCourt: function(){
				this.set('isEditingCourt', true);
				console.log('true', this.model);
			}
		}
	});



})();