var React = require('react'),
	DeckStore = require('../../stores/deck-store'),
	DeckControls = require('./deck-controls.react'),
	DeckCollection = require('./deck-collection.react');

var DeckIndex = React.createClass({displayName: "DeckIndex",
	getInitialState: function() {
		return {
			decks: DeckStore.getAll()
		};
	},
	componentDidMount: function() {
		DeckStore.addChangeListener(this._onChange);
	},
	render: function() {
		return (
			React.createElement("section", {className: "deck-panel"}, 
				React.createElement(DeckControls, null), 
				React.createElement(DeckCollection, {decks: this.state.decks})
			)
		);
	},
	_onChange: function() {
		this.setState({
			decks: DeckStore.getAll()
		});
	}
});

module.exports = DeckIndex;