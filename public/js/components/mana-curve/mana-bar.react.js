var React = require('react');

module.exports = React.createClass({
	
	render: function() {
		var ratioHeight = {
			height: (this.props.ratio * 100) + '%'
		};

		return (
			<li className='mana-curve__item'>
				<div className='mana-bar'>
					<div className='mana-bar__count'>{this.props.value}</div>
					<div className='mana-bar__bar progress'>
						<div className='mana-bar__bar__amount progress-bar' style={ratioHeight} />
					</div>
					<div className='mana-bar__label' data-mana={this.props.label} onClick={this.props.manaClick}>{this.props.label}</div>
				</div> 
			</li>
		);
	}
});