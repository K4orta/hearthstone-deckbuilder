var React = require('react'),
	FilterOption = require('./filter-option.react');

module.exports = React.createClass({displayName: "exports",
	getInitialState: function() {
		return {
			selected: this.props.selected || null
		};
	},
	render: function() {
		console.log()
		var options = this.props.items.map(function(item) {
			return (
				React.createElement(FilterOption, {key: item, name: item, checked: this.props.selected === item, callback: this._change})
			);
		}.bind(this));
		return (
			React.createElement("span", {className: 'option-group ' + this.props.group}, 
				options
			)
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