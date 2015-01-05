 var AppDispatcher = require('../dispatcher/app-dispatcher'),
 	EventEmitter = require('events').EventEmitter,
 	assign = require('object-assign'),
 	DeckConstants = require('../constants/deck'),
 	DeckRules = require('../utils/deck-rules'),
 	_ = require('lodash');

var _collection = [],
	CHANGE_EVENT = 'change',
	_idIndex = 0,
	_currentDeck = 0;

var createDeck = function(action) {
	_collection.unshift({
		name: action.name,
		id: _idIndex++,
		cards: [],
		deckType: action.hero || 'neutral'
	});
	_currentDeck = _collection[0].id;
};

//TODO: REMOVE THIS
createDeck({
	name: 'New Mage Deck',
	hero: 'mage'
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
	_currentDeck = action.id;
};

var removeCard = function(action) {
	var deck = Store.getDeck(action.deckId);
	var cardIndex = _.findLastIndex(deck.cards, function(card) {
		return card.id === action.cardId;
	});
	
	deck.cards.splice(cardIndex, 1);
};

var removeDeck = function(action) {
	var deleteIndex = _.findIndex(_collection, function(deck) {
		return deck.id === action.id;	
	});

	delete _collection[deleteIndex];
	_collection = _.compact(_collection);
	if (_currentDeck == action.id) {
		_currentDeck = _.first(_collection).id;
	}
};

var Store = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return _collection;
	},
	getCurrentDeckId: function() {
		return _currentDeck;
	},
	getCurrentDeck: function() {
		return _.findWhere(_collection, {id: _currentDeck});
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
		case DeckConstants.DECK_REMOVE_CARD:
			removeCard(action);
			break;
		default:
			return true;
	}
	
	Store.emitChange();
	return true;
});

module.exports = Store;