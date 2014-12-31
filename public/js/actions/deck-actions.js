var AppDispatcher = require('../dispatcher/app-dispatcher'),
	DeckConstants = require('../constants/deck');

var DeckActions = {
	create: function(name) {
		AppDispatcher.handleViewAction({
			actionType: DeckConstants.DECK_CREATE,
			name: name	
		});
	},
	addCard: function(deckId, card) {
		AppDispatcher.handleViewAction({
			actionType: DeckConstants.DECK_ADD_CARD,
			id: deckId,
			card: card
		});
	},
	changeActiveDeck: function(deckId) {
		AppDispatcher.handleViewAction({
			actionType: DeckConstants.DECK_SET_ACTIVE,
			id: deckId
		});
	}
};

module.exports = DeckActions;
