var React = require('react'),
	_ = require('lodash'),
	Router = require('react-router'),
	Link = Router.Link;


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
				<li className='deck__card-list__item' key={i}>
					<span>{card.name} x {multi[card.id]}</span>
					<i className='fa fa-times-circle card-list__item__remove-button' data-id={card.id} data-deck={this.props.data.id} onClick={this.props.handleRemoveCard} />
				</li>
			);
		}.bind(this));

		return (
			<li className={'deck' + (this.props.isActive ? ' active' : '')}>
				<h4 className='deck__title'>
					<Link to={'/decks/' + this.props.data.id} data-id={this.props.data.id} onClick={this.props.handleDeckChange}>
						{this.props.data.name}
					</Link>
					({this.props.data.cards.length}/30)
				</h4>
				<i className='fa fa-trash-o deck__destroy-icon' data-id={this.props.data.id} onClick={this.props.handleDeckDestroy} />
				<ul className='deck__card-list'>
					{cards}
				</ul>

			</li>
		);
	}
});

module.exports = Deck;