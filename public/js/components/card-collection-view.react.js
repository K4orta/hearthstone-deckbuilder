var React = require('react');

var Collection = React.createClass({
	render: function() {
		var card = this.props.data,
			attackIcon,
			healthIcon,
			usedTag,
			allUsed;

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
			if (card.quality === 'legendary') {
				cardLimit = 1;
			}

			if (this.props.used === cardLimit) {
				allUsed = true;
			}
			usedTag = (
				<div className='hs-card__used-tag'>{this.props.used}/{cardLimit}</div>
			);
		}

		return (
			<li className={'hs-card' + (allUsed ? ' card-limit' : '')} data-id={card.id} onClick={this.props.onClick}>
				<div className='hs-card__mana'>{card.mana}</div>
				{usedTag}
				{attackIcon}
				{healthIcon}
				<div className={'hs-card__portait ' + card.quality} >
					<img className='hs-card__image' src={'/images/cards/' + card.image_url}/>
				</div>
				<h4 className='hs-card__title'>{card.name}</h4>
				<div className='hs-card__description'>
					<p dangerouslySetInnerHTML={{__html: card.description}} />
				</div>
			</li>
		);
	}
});

module.exports = Collection;