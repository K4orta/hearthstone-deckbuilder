var React = require('react'),
	_ = require('lodash');


var Deck = React.createClass({
	_totalMana: function() {
		return _.reduce(
			this.props.data.cards, 
			function(memo, card) {
				return memo + card.mana;
			}, 0);
	},
	render: function() {
		var merged = [],
			multi = {};
		this.props.data.cards.forEach(function(card) {
			if (multi[card.id] == null) {
				multi[card.id] = 1;
				merged.push(card);
			} else {
				multi[card.id] += 1;
			}
		});

		var cards = merged.map(function(card, i) {
			return (
				<li key={i}>{card.name} x {multi[card.id]}</li>
			);
		});

		return (
			<div className={'deck' + (this.props.isActive ? ' active' : '')}>
				<h4 className='deck__title'><a data-id={this.props.data.id} onClick={this.props.handleDeckChange}>{this.props.data.name}</a> ({this.props.data.cards.length}/30)</h4>
				<ul>
					{cards}
				</ul>

			</div>
		);
	}
});

module.exports = Deck;