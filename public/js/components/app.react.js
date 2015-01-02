var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	Index = require('./index.react'),
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

var routes = (
	<Route path='/' name='index' handler={App}>
		<Route name='decks/:deckId' handler={Index} ignoreScrollBehavior />
		<DefaultRoute handler={Index}/>
	</Route>
);

module.exports = function() {
	React.initializeTouchEvents(true);
	Router.run(routes, function(Handler) {
		React.render(<Handler />, document.querySelector('.content'));
	});
};
