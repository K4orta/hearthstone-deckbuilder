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
	_onBlur: function(e) {
		document.querySelector('.deckbuilder').classList.remove('input-focused');
	},
	_onFocus: function(e) {
		document.querySelector('.deckbuilder').classList.add('input-focused');
	},
	_onKeyPress: function(e) {
		if(e.key === 'Enter') {
			this.refs.searchField.getDOMNode().blur();
		}
	},
	render: function() {
		var query = this.getQuery();
		return (
			<div className='search'>
				<input className='search__input' ref='searchField' type='text' value={query.search} onChange={this._onInput} onBlur={this._onBlur} onFocus={this._onFocus} onKeyPress={this._onKeyPress}></input>
				<i className='fa fa-search search__icon' />
			</div>
		);
	}
});

