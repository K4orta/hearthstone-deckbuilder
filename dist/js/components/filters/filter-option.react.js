var React = require('react');

module.exports = React.createClass({displayName: "exports",
	render: function() {
		return (
			React.createElement("label", {htmlFor: this.props.name, className: "filter-bar__label", "data-checked": this.props.checked}, 
				React.createElement("input", {id: this.props.name, type: "checkbox", checked: this.props.checked, className: "filter-bar__checkbox", onChange: this.props.callback}), 
				this.props.name
			)
		);
	}
});