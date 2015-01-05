var React = require('react'),
	FilterOption = require('./filter-option.react');

module.exports = React.createClass({
	getInitialState: function() {
		var state = {};
		this.props.items.forEach(function(item) {
			state[item] = false;
		});
		return state;
	},
	render: function() {
		var options = this.props.items.map(function(item) {
			return (
				<FilterOption key={item} name={item} checked={this.state[item]} callback={this._change} />
			);
		}.bind(this));
		return (
			<span className={'option-group ' + this.props.group}>
				{options}
			</span>
		);
	},
	_change: function(e) {
		var state = this.state;
		state[e.currentTarget.id] = e.currentTarget.checked;
		this.props.items.forEach(function(option) {
			if (option != e.currentTarget.id) {
				state[option] = false;
			}
		});
		this.setState(state);

		if (this.props.callback) {
			this.props.callback(this.props.group, this.state);
		}
	}
});