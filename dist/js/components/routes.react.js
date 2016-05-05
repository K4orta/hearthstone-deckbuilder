var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	App = require('./app.react'),
	Index = require('./index.react');

module.exports = (
	React.createElement(Route, {path: "/", name: "index", handler: App}, 
		React.createElement(Route, {name: "decks/:deckId", handler: Index, ignoreScrollBehavior: true}), 
		React.createElement(Route, {name: "decks/", handler: Index, ignoreScrollBehavior: true}), 
		React.createElement(DefaultRoute, {handler: Index})
	)
);

