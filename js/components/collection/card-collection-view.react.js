var React = require('react');

var Collection = React.createClass({
	render: function() {
		var card = this.props.data,
			attackIcon,
			healthIcon,
			usedTag,
			cardClass = 'hs-card';

		if (card.attack) {
			attackIcon = (
				<div className='hs-card__attack'>{card.attack}</div>
			);
		}

		if (card.health) {
			healthIcon = (
				<div className='hs-card__health'>{card.health}</div>
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
				<div className='hs-card__used-tag'>{this.props.used}/{cardLimit}</div>
			);

		}

		return (
			<li className={cardClass} data-id={card.id} onClick={this.props.onClick}>
				<div className='hs-card__mana'>{card.cost}</div>
				{usedTag}
				{attackIcon}
				{healthIcon}
				<div className={'hs-card__portait ' + card.rarity.toLowerCase()} >
					<img className='hs-card__image' src={'images/cards/' + card.image}/>
				</div>
				<h4 className='hs-card__title'>{card.name}</h4>
				<div className='hs-card__description'>
					<p dangerouslySetInnerHTML={{__html: card.text}} />
				</div>
			</li>
		);
	}
});

module.exports = Collection;
