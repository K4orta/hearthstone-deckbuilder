var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			
		};
	},
	render: function() {
		return (
			<div className='filter-bar__option'>
				<input id={this.props.name} type='checkbox' checked={this.props.checked} className='filter-bar__checkbox' ref='checkbox' onChange={this.props.callback} />
				<label htmlFor={this.props.name} className='filter-bar__label'>
					{this.props.name}
				</label>
			</div>
		);
	},
	_switchOn: function() {
		// console.log(this.refs.checkbox.getDOMNode().dataset.checked);
		// this.refs.checkbox.getDOMNode().setAttribute('checked', false);
	}
});