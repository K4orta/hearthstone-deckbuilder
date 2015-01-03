var React = require('react'),
	Router = require('react-router'),
	Link = Router.Link;

var Pagination = React.createClass({
	render: function() {
		var pages = this.props.data.map(function(data, i) {
			var unlinkedPage = (
				<li key={i} className='pagination__item'>
					{i+1}
				</li>
			),
			linkedPage = (
				<li key={i} className='pagination__item'>
					<Link to='index' query={{page: i+1}}>
						{i+1}
					</Link>
				</li>
			);

			return i+1 == this.props.currentPage ? unlinkedPage : linkedPage;
		}.bind(this));
		
		return (
			<ul className='pagination'>
				{pages}
			</ul>
		);
	}
});

module.exports = Pagination;