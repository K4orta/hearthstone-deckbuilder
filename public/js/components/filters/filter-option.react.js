var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
				<label htmlFor={this.props.name} className='filter-bar__label' data-checked={this.props.checked}>
					<input id={this.props.name} type='checkbox' checked={this.props.checked} className='filter-bar__checkbox' onChange={this.props.callback} />
					{this.props.name}
				</label>
		);
	}
});