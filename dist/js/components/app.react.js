var React = require('react'),
	Router = require('react-router'),
	RouteHandler = Router.RouteHandler;

var App = React.createClass({displayName: "App",
	render: function() {
		return (
			React.createElement("div", {className: "deckbuilder"}, 
				React.createElement(RouteHandler, null)
			)
		);
	}
});

module.exports = App;
