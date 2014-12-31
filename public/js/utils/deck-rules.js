var _ = require('lodash'),
	DeckConstants = require('../constants/deck');
module.exports = {
	deckLimit: function(deck) {
		return deck.cards.length < DeckConstants.DECK_MAX_SIZE;
	},
	cardLimit: function(deck, card) {
		var count = _.filter(deck.cards, function(val) {
			return val.id === card.id; 
		}).length;

		// Can only have one of a given legendary
		if (card.quality === 'legendary' && count >= DeckConstants.DECK_LEGENDARY_LIMIT) {
			return false;
		}

		// Can only have two of any card
		if (count >= DeckConstants.DECK_EACH_CARD_LIMIT) {
			return false;
		}

		return true;
	}
}