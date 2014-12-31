var React = require('react');

var Heroes = React.createClass({
	render: function() {
		var heroes = this.props.data.map(function(hero) {
			return (
				<option value={hero.hero} key={hero.id} >{hero.name}</option>
			);
		});

		return (
			<select onChange={this._heroChanged}>
				{heroes}
			</select>
		);
	},
	_heroChanged: function(e) {
		this.props.onChange(e);
	}
});

module.exports = Heroes;