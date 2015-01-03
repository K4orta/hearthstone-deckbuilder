var React = require('react'),
	Collection = require('./collection.react'),
	Heroes = require('./hero-selector.react'),
	HeroStore = require('../stores/hero-store'),
	Decks = require('./decks/index.react'), 
	DeckTools = require('./deck-tools.react'), 
	_ = require('lodash');

var Index = React.createClass({
	
	getInitialState: function() {
		return {
			currentHero: _.first(HeroStore.getAll()).hero
		};
	},
	render: function() {
				// <Heroes data={HeroStore.getAll()} onChange={this.switchHero}/>
		return (
			<div> 
				<Decks />
				<Collection hero={this.state.currentHero} />
				<DeckTools />
			</div>
		);
	},
	switchHero: function(e) {
		this.setState({
			currentHero: e.target.value
		});
	}
});

module.exports = Index;