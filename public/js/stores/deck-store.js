 var AppDispatcher = require('../dispatcher/app-dispatcher'),
 	EventEmitter = require('events').EventEmitter,
 	assign = require('object-assign'),
 	DeckConstants = require('../constants/deck'),
 	DeckRules = require('../utils/deck-rules'),
 	_ = require('lodash');

var _collection = [],
	CHANGE_EVENT = 'change',
	idIndex = 0,
	currentDeck = 0;

var createDeck = function(action) {
	_collection.push({
		name: action.name,
		id: idIndex++,
		cards: [],
		deckType: 'neutral'
	});
};

//TODO: REMOVE THIS
createDeck({
	name: 'Default'
});

var addCard = function(action) {
	var deck = _.findWhere(_collection, {id: action.id});
	if (_.every([
			DeckRules.deckLimit(deck),
			DeckRules.cardLimit(deck, action.card)
		])) {
		deck.cards.push(action.card);
	}
};

var setActiveDeck = function(action) {
	currentDeck = action.id;
};

var removeDeck = function(action) {
	var deleteIndex = _.findIndex(_collection, function(deck) {
		return deck.id === action.id;	
	});

	delete _collection[deleteIndex];
	_collection = _.compact(_collection);
	if (currentDeck == action.id) {
		currentDeck = _.first(_collection).id;
	}
};

var Store = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return _collection;
	},
	getCurrentDeckId: function() {
		return currentDeck;
	},
	getCurrentDeck: function() {
		return _.findWhere(_collection, {id: currentDeck});
	},
	getDeck: function(id) {
		return _.findWhere(_collection, {id: id});
	},
	getUsedCards: function(deck) {
		return _.countBy(deck.cards, function(card) {
			return card.id;
		});
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.addListener(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case DeckConstants.DECK_ADD_CARD:
			addCard(action);
			break;
		case DeckConstants.DECK_CREATE:
			createDeck(action);
			break;
		case DeckConstants.DECK_SET_ACTIVE:
			setActiveDeck(action);
			break;
		case DeckConstants.DECK_DESTROY:
			removeDeck(action);
			break;
		default:
			return true;
	}

	Store.emitChange();
	return true;
});

module.exports = Store;