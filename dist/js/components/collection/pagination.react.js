var React = require('react'),
	Router = require('react-router'),
	Link = Router.Link;

var Pagination = React.createClass({displayName: "Pagination",
	render: function() {
		var pages = this.props.data.map(function(data, i) {
			var unlinkedPage = (
				React.createElement("li", {key: i, className: "pagination__item"}, 
					i+1
				)
			),
			linkedPage = (
				React.createElement("li", {key: i, className: "pagination__item"}, 
					React.createElement(Link, {to: "index", query: {page: i+1}}, 
						i+1
					)
				)
			);

			return i+1 == this.props.currentPage ? unlinkedPage : linkedPage;
		}.bind(this));
		
		return (
			React.createElement("ul", {className: "pagination"}, 
				pages
			)
		);
	}
});

module.exports = Pagination;