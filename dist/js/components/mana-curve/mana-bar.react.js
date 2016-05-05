var React = require('react');

module.exports = React.createClass({displayName: "exports",
	
	render: function() {
		var ratioHeight = {
			height: (this.props.ratio * 100) + '%'
		};

		return (
			React.createElement("li", {className: "mana-curve__item"}, 
				React.createElement("div", {className: "mana-bar"}, 
					React.createElement("div", {className: "mana-bar__count"}, this.props.value), 
					React.createElement("div", {className: "mana-bar__bar progress"}, 
						React.createElement("div", {className: "mana-bar__bar__amount progress-bar", style: ratioHeight})
					), 
					React.createElement("div", {className: "mana-bar__label", "data-mana": this.props.label, onClick: this.props.manaClick}, this.props.label)
				)
			)
		);
	}
});