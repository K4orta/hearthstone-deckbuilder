var React = require('react');

module.exports = React.createClass({displayName: "exports",
	render: function() {
		var card = this.props.data;
		var icon = (
			React.createElement("i", {className: 'card-list__item__quality-gem ' + card.rarity.toLowerCase()}, card.cost)
		); 
		return (
			React.createElement("li", {className: "deck__card-list__item"}, 
				icon, 
				React.createElement("span", null, card.name, " x ", this.props.count), 
				React.createElement("i", {className: "fa fa-times-circle card-list__item__remove-button", "data-id": card.id, "data-deck": this.props.deck.id, onClick: this.props.handleRemoveCard})
			)
		);
	}
});