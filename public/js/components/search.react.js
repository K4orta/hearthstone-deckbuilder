var React = require('react'),
	Router = require('react-router');

module.exports = React.createClass({
	mixins: [
		Router.Navigation,
		Router.State
	],
	_onInput: function(e) {
		var searchQuery = this.refs.searchField.getDOMNode().value,
			queryParam;
		if (searchQuery) {
			queryParam = {search: searchQuery};
		}
		this.replaceWith('/', {}, queryParam);
	},
	render: function() {
		var query = this.getQuery();
		return (
			<div className='search'>
				<input className='search__input' ref='searchField' type='text' value={query.search} onChange={this._onInput}></input>
				<i className='fa fa-search search__icon' />
			</div>
		);
	}
});

