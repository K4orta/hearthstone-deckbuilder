var React = require('react'),
	Router = require('react-router'),
	RouteHandler = Router.RouteHandler;

var App = React.createClass({
	render: function() {
		return (
			<div className='deckbuilder'>
				<RouteHandler />
			</div>
		);
	}
});

module.exports = App;
