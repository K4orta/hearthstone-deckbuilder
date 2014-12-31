var React = require('react'),
	DeckStore = require('../../stores/deck-store'),
	DeckActions = require('../../actions/deck-actions'),
	Deck = require('./deck-view.react');

var Collection = React.createClass({
	_changeDeck: function(e) {
		DeckActions.changeActiveDeck(parseInt(e.target.dataset.id));
	},
	render: function() {
		var currentDeckId = DeckStore.getCurrentDeckId();
		var decks = this.props.decks.map(function(deck, i) {
			return (
				<Deck key={i} data={deck} handleDeckChange={this._changeDeck} isActive={deck.id === currentDeckId}/>
			);
		}.bind(this));
		return (
			<ul className='deck-list'>
				{decks}
			</ul>
		);
	}
});

module.exports = Collection;