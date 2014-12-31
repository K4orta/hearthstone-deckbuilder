var React = require('react'),
	DeckActions = require('../../actions/deck-actions');

var createInstructions = 'Create a deck',
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
	render: function() {
		return (
			<div className='deck-index__controls'>
				<input type='text' ref='newDeck' placeholder={createInstructions}> </input>
				<button className='deck-index__create-btn' onClick={this._createDeck}>+</button>
			</div>
		);
	}
});

module.exports = Collection;