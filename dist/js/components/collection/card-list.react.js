var React = require('react'),
	CardView = require('./card-collection-view.react'),
	DeckActions = require('../../actions/deck-actions'),
	DeckStore = require('../../stores/deck-store'),
	Cards = require('../../stores/card-store'),
	_ = require('lodash');

var CardList = React.createClass({displayName: "CardList",
	getInitialState: function() {
		return {
			usedCards: this._getCurrentUsedCards()
		};
	},
	componentDidMount: function() {
		DeckStore.addChangeListener(this._onChange);
	},
	render: function() {
		var cardList = this.props.data.map(function(card) {
			return (React.createElement(CardView, {data: card, key: card.id, used: this.state.usedCards[card.id], onClick: this._addCardToDeck}));
		}.bind(this));

		return (
			React.createElement("ul", {className: "card-list"}, 
				cardList
			)	
		);
	},
	_onChange: function(e) {
		this.setState({
			usedCards: this._getCurrentUsedCards()
		});
	},
	_addCardToDeck: function(e) {
		DeckActions.addCard(DeckStore.getCurrentDeckId(), Cards.getCard(e.currentTarget.dataset.id));
	},
	_getCurrentUsedCards: function() {
		return DeckStore.getUsedCards(DeckStore.getCurrentDeck());
	}
});

module.exports = CardList;