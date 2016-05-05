var React = require('react'),
	DeckStore = require('../../stores/deck-store'),
	DeckActions = require('../../actions/deck-actions'),
	Deck = require('./deck-view.react'),
	Router = require('react-router');

var Collection = React.createClass({displayName: "Collection",
	mixins: [Router.State],
	_changeDeck: function(e) {
		DeckActions.changeActiveDeck(parseInt(e.target.dataset.id));
	},
	_deleteDeck: function(e) {
		DeckActions.destroyDeck(parseInt(e.target.dataset.id));
	},
	_removeCard: function(e) {
		DeckActions.removeCard(parseInt(e.target.dataset.deck), e.target.dataset.id);
	},
	componentDidMount: function() {
		var params = this.getParams();
		if (params.deckId != null) {
			var activeDeck = DeckStore.getDeck(parseInt(params.deckId));
			if(activeDeck != null) {
				DeckActions.changeActiveDeck(parseInt(params.deckId));
			}
		}
	},
	render: function() {
		var currentDeckId = DeckStore.getCurrentDeckId();
		var decks = this.props.decks.map(function(deck, i) {
			return (
				React.createElement(Deck, {key: i, data: deck, handleDeckChange: this._changeDeck, handleDeckDestroy: this._deleteDeck, handleRemoveCard: this._removeCard, isActive: deck.id === currentDeckId})
			);
		}.bind(this));
		return (
			React.createElement("ul", {className: "deck-list"}, 
				decks
			)
		);
	}
});

module.exports = Collection;