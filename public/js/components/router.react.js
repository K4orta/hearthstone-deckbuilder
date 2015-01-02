var Router = require('react-router'),
	routes = require('./routes.react');
	
var router = Router.create({
	routes: routes
});

module.exports = router;