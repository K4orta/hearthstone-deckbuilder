var FastClick = require('fastclick'),
	AppRouter = require('./components/router.react'),
	React = require('react');

FastClick(document.body);

React.initializeTouchEvents(true);
AppRouter.run(function(Handler) {
	React.render(<Handler />, document.querySelector('.content'));
});
