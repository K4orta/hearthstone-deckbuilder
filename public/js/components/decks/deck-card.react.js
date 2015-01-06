var React = require('react');

module.exports = React.createClass({
	render: function() {
		var card = this.props.data;
		var icon = (
			<i className={'card-list__item__quality-gem ' + card.quality}>{card.mana}</i>
		); 
		return (
			<li className='deck__card-list__item'>
				{icon}
				<span>{card.name} x {this.props.count}</span>
				<i className='fa fa-times-circle card-list__item__remove-button' data-id={card.id} data-deck={this.props.deck.id} onClick={this.props.handleRemoveCard} />
			</li>
		);
	}
});