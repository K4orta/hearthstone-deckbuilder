var React = require('react'),
	DeckActions = require('../../actions/deck-actions'),
	Heroes = require('./hero-selector.react'),
	HeroStore = require('../../stores/hero-store');

var createInstructions = 'Deck Name',
	createEmptyError = 'Enter a name first';


var Collection = React.createClass({
	getInitialState: function() {
		return {
			menuOpen: false
		};
	},
	render: function() {
		return (
			<div className='deck-index__controls'>
				<button className='btn deck-index__controls__new-deck' onClick={this._startCreate}>
					<i className='fa fa-plus'/> Create Deck
				</button>
				<div className={'deck-index__create-wrapper' + (this.state.menuOpen? ' is-open' : '')}>
					<label>Class:</label>
					<Heroes ref='heroSelect' />
					<label>Deck Name:</label>
					<input type='text' ref='newDeck' placeholder={createInstructions} onBlur={this._onBlur} onFocus={this._onFocus} onKeyPress={this._onKeyPress}> </input>
					
					<div className='create-wrapper__button-group'>
						<button className='btn deck-index__create-btn' onClick={this._createDeck}>
							<i className='fa fa-check' /> Create
						</button>
						<button className='btn' onClick={this._cancelCreate}>
							<i className='fa fa-times' /> Cancel
						</button>
					</div>
				</div>
			</div>
		);
	},
	_startCreate: function(e) {
		this.setState({
			menuOpen: !this.state.menuOpen
		});
	},
	_cancelCreate: function() {
		this.setState({
			menuOpen: false
		});
	},
	_createDeck: function(e) {
		var nameField = this.refs.newDeck.getDOMNode(),
			newDeckName = nameField.value,
			newDeckHero = this.refs.heroSelect.getDOMNode().value;

		if (newDeckName === '') {
			nameField.setAttribute('placeholder', createEmptyError);
		} else {
			DeckActions.create(newDeckName, newDeckHero);
			nameField.value = '';
			nameField.setAttribute('placeholder', createInstructions);
			this.setState({
				menuOpen: false
			});
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
	}
});

module.exports = Collection;