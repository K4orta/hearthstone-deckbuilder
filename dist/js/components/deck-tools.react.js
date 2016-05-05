var React = require('react'),
	ManaCurve = require('./mana-curve/index.react'),
	DeckStore = require('../stores/deck-store');

var DeckTools = React.createClass({displayName: "DeckTools",
	getInitialState: function() {
		return {
			deck: DeckStore.getCurrentDeck() 
		};
	},
	componentDidMount: function() {
		DeckStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		this.setState({
			deck: DeckStore.getCurrentDeck() 
		});
	},
	_deckOptionClick: function(e) {
		document.querySelector('.deckbuilder').classList.toggle('deck-menu-open');
	},
	render: function() {
		return (
			React.createElement("div", {className: "deck-tools"}, 
				React.createElement("div", {className: "deck-menu"}, 
					React.createElement("div", {className: "deck__title"}, 
						this.state.deck.name, " (", this.state.deck.cards.length, "/30)"
					), 
					React.createElement("i", {className: "fa fa-reorder deck-menu__options", onClick: this._deckOptionClick})
				), 
				React.createElement(ManaCurve, null)
			)
		);
	}
});

module.exports = DeckTools;
