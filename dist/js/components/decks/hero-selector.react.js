var React = require('react'),
	HeroStore = require('../../stores/hero-store'),
	cap = require('capitalize');


var Heroes = React.createClass({displayName: "Heroes",
	getInitialState: function() {
		return {
			heroes: HeroStore.getAll()
		};
	},
	render: function() {
		var heroes = this.state.heroes.map(function(hero) {
			return (
				React.createElement("option", {value: hero.playerClass, key: hero.id, className: 'hero-selector__option '+hero.playerClass}, hero.playerClass)
			);
		});

		return (
			React.createElement("select", {onChange: this._heroChanged, className: "hero-selector"}, 
				heroes
			)
		);
	},
	_heroChanged: function(e) {
		if (this.props.onChange) {
			this.props.onChange(e);	
		}
	}

});

module.exports = Heroes;