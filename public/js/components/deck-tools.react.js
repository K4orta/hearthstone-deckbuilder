var React = require('react'),
	ManaCurve = require('./mana-curve/index.react'),
	DeckStore = require('../stores/deck-store');

var DeckTools = React.createClass({
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
			<div className='deck-tools'>
				<div className='deck-menu'> 
					<div className='deck__title'>
						{this.state.deck.name} ({this.state.deck.cards.length}/30)
					</div>
					<i className='fa fa-reorder deck-menu__options' onClick={this._deckOptionClick}/>
				</div>
				<ManaCurve />
			</div>
		);
	}
});

module.exports = DeckTools;
