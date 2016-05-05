var React = require('react'),
	Collection = require('./collection/collection.react'),
	Decks = require('./decks/index.react'), 
	DeckTools = require('./deck-tools.react'), 
	_ = require('lodash');

var Index = React.createClass({
	render: function() {
		return (
			<div className='content'> 
				<Decks />
				<Collection />
				<DeckTools />
			</div>
		);
	}
});

module.exports = Index;