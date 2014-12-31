var React = require('react');

var Collection = React.createClass({
	render: function() {
		var card = this.props.data,
			attackIcon,
			healthIcon;

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

		return (
			<li className='hs-card' data-id={card.id} onClick={this.props.onClick}>
				<div className='hs-card__mana'>{card.mana}</div>
				{attackIcon}
				{healthIcon}
				<div className={'hs-card__portait ' + card.quality} >
					<img className='hs-card__image' src={'/images/cards/' + card.image_url}/>
				</div>
				<div className='hs-card__title'>{card.name}</div>
				<div className='hs-card__description' dangerouslySetInnerHTML={{__html: card.description}}/>
			</li>
		);
	}
});

module.exports = Collection;