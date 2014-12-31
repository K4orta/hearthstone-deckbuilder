var React = require('react'),
	CardView = require('./card-collection-view.react'),
	DeckActions = require('../actions/deck-actions'),
	DeckStore = require('../stores/deck-store'),
	Cards = require('../stores/card-store'),
	_ = require('lodash');

var CardList = React.createClass({
	_addCardToDeck: function(e) {
		DeckActions.addCard(DeckStore.getCurrentDeckId(), Cards.getCard(parseInt(e.currentTarget.dataset.id)));
	},
	componentDidMount: function() {
		DeckStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			usedCards: this._getCurrentUsedCards()
		};
	},
	_getCurrentUsedCards: function() {
		return DeckStore.getUsedCards(DeckStore.getCurrentDeck());
	},
	_onChange: function() {
		this.setState({
			usedCards: this._getCurrentUsedCards()
		});
	},
	render: function() {
		var cardList = this.props.data.map(function(card) {
			return (<CardView data={card} key={card.id} used={this.state.usedCards[card.id]} onClick={this._addCardToDeck}/>);
		}.bind(this));

		return (
			<ul className='card-list'>
				{cardList}
			</ul>	
		);
	}
});

module.exports = CardList;