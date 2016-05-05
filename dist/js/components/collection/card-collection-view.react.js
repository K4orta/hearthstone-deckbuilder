var React = require('react');

var Collection = React.createClass({displayName: "Collection",
	render: function() {
		var card = this.props.data,
			attackIcon,
			healthIcon,
			usedTag,
			cardClass = 'hs-card';

		if (card.attack) {
			attackIcon = (
				React.createElement("div", {className: "hs-card__attack"}, card.attack)
			);
		}

		if (card.health) {
			healthIcon = (
				React.createElement("div", {className: "hs-card__health"}, card.health)
			);
		}

		if (this.props.used) {
			var cardLimit = 2;
			if (card.rarity === 'Legendary') {
				cardLimit = 1;
			}

			if (this.props.used === cardLimit) {
				cardClass += ' card-limit'
			}
			usedTag = (
				React.createElement("div", {className: "hs-card__used-tag"}, this.props.used, "/", cardLimit)
			);

		}

		return (
			React.createElement("li", {className: cardClass, "data-id": card.id, onClick: this.props.onClick}, 
				React.createElement("div", {className: "hs-card__mana"}, card.cost), 
				usedTag, 
				attackIcon, 
				healthIcon, 
				React.createElement("div", {className: 'hs-card__portait ' + card.rarity.toLowerCase()}, 
					React.createElement("img", {className: "hs-card__image", src: 'images/cards/' + card.image})
				), 
				React.createElement("h4", {className: "hs-card__title"}, card.name), 
				React.createElement("div", {className: "hs-card__description"}, 
					React.createElement("p", {dangerouslySetInnerHTML: {__html: card.text}})
				)
			)
		);
	}
});

module.exports = Collection;
