var React = require('react'),
	DeckStore = require('../../stores/deck-store'),
	DeckControls = require('./deck-controls.react'),
	DeckCollection = require('./deck-collection.react');

var DeckIndex = React.createClass({
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
			<section className='deck-panel'>
				<DeckControls />
				<DeckCollection decks={this.state.decks}/>
			</section>
		);
	},
	_onChange: function() {
		this.setState({
			decks: DeckStore.getAll()
		});
	}
});

module.exports = DeckIndex;