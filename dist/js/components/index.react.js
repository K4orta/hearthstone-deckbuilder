var React = require('react'),
	Collection = require('./collection/collection.react'),
	Decks = require('./decks/index.react'), 
	DeckTools = require('./deck-tools.react'), 
	_ = require('lodash');

var Index = React.createClass({displayName: "Index",
	render: function() {
		return (
			React.createElement("div", {className: "content"}, 
				React.createElement(Decks, null), 
				React.createElement(Collection, null), 
				React.createElement(DeckTools, null)
			)
		);
	}
});

module.exports = Index;