var React = require('react'),
	FilterOption = require('./filter-option.react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			selected: this.props.selected || null
		};
	},
	render: function() {
		var options = this.props.items.map(function(item) {
			return (
				<FilterOption key={item} name={item} checked={this.state.selected === item} callback={this._change} />
			);
		}.bind(this));
		return (
			<span className={'option-group ' + this.props.group}>
				{options}
			</span>
		);
	},
	_change: function(e) {
		var state = {};
		if (e.currentTarget.checked) {
			state = {selected: e.currentTarget.id};
		} else {
			state = {selected: null};
		}

		this.setState(state);
		
		if (this.props.callback) {
			var ret = {};		
			ret[this.props.group] = state.selected;
			this.props.callback(ret);
		}
	}
});