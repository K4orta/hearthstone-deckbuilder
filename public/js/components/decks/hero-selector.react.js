var React = require('react'),
	HeroStore = require('../../stores/hero-store'),
	cap = require('capitalize');


var Heroes = React.createClass({
	getInitialState: function() {
		return {
			heroes: HeroStore.getAll()
		};
	},
	render: function() {
		var heroes = this.state.heroes.map(function(hero) {
			return (
				<option value={hero.hero} key={hero.id} className={'hero-selector__option '+hero.hero}>{cap(hero.hero)}</option>
			);
		});

		return (
			<select onChange={this._heroChanged} className='hero-selector'>
				{heroes}
			</select>
		);
	},
	_heroChanged: function(e) {
		if (this.props.onChange) {
			this.props.onChange(e);	
		}
	}

});

module.exports = Heroes;