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
	},
	destroyDeck: function(deckId) {
		AppDispatcher.handleViewAction({
			actionType: DeckConstants.DECK_DESTROY,
			id: deckId
		});
	},
	removeCard: function(deckId, cardId) {
		AppDispatcher.handleViewAction({
			actionType: DeckConstants.DECK_REMOVE_CARD,
			deckId: deckId,
			cardId: cardId
		});
	}
};

module.exports = DeckActions;
