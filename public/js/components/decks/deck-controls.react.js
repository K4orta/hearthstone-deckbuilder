var React = require('react'),
	DeckActions = require('../../actions/deck-actions'),
	Heroes = require('./hero-selector.react'),
	HeroStore = require('../../stores/hero-store');

var createInstructions = 'Deck Name',
	createEmptyError = 'Enter a name first';


var Collection = React.createClass({
	_createDeck: function(e) {
		var nameField = this.refs.newDeck.getDOMNode();
		var newDeckName = nameField.value;
		if (newDeckName === '') {
			nameField.setAttribute('placeholder', createEmptyError);
		} else {
			DeckActions.create(newDeckName);
			nameField.value = '';
			nameField.setAttribute('placeholder', createInstructions);
		}
	},
	_onBlur: function(e) {
		document.querySelector('.deckbuilder').classList.remove('input-focused');
	},
	_onFocus: function(e) {
		document.querySelector('.deckbuilder').classList.add('input-focused');
	},
	_onKeyPress: function(e) {
		if(e.key === 'Enter') {
			this.refs.newDeck.getDOMNode().blur();
			this._createDeck();
		}
	},
	render: function() {
		return (
			<div className='deck-index__controls'>
				<button className='btn'>New Deck</button>
				<div className='deck-index__create-wrapper'>
					<Heroes />
					<input type='text' ref='newDeck' placeholder={createInstructions} onBlur={this._onBlur} onFocus={this._onFocus} onKeyPress={this._onKeyPress}> </input>
					<button className='btn deck-index__create-btn' onClick={this._createDeck}>
						<i className='fa fa-check' /> Create
					</button>
					<button className='btn'>
						<i className='fa fa-times' /> Cancel
					</button>
				</div>
			</div>
		);
	}
});

module.exports = Collection;