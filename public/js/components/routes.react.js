var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	App = require('./app.react'),
	Index = require('./index.react');

module.exports = (
	<Route path='/' name='index' handler={App}>
		<Route name='decks/:deckId' handler={Index} ignoreScrollBehavior />
		<DefaultRoute handler={Index}/>
	</Route>
);

