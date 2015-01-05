var React = require('react'),
	Router = require('react-router'),
	assign = require('object-assign'),
	_ = require('lodash');

module.exports = React.createClass({
	mixins: [
		Router.Navigation,
		Router.State
	],
	getInitialState: function() {
		var query = this.getQuery();
		return {
			input: query.search || '' 
		};
	},
	render: function() {
		var icon = 'fa-search'
		if (this.state.input !== '') {
			icon = 'fa-times';
		}

		return (
			<div className='search'>
				<input className='search__input' ref='searchField' type='text' value={this.state.input} onChange={this._onInput} onBlur={this._onBlur} onFocus={this._onFocus} onKeyPress={this._onKeyPress}></input>
				<i className={'fa '+ icon +' search__icon'} onClick={this._clearInput} />
			</div>
		);
	},
	_onInput: function(e) {
		var searchQuery = this.refs.searchField.getDOMNode().value,
			queryParam;
		if (searchQuery) {
			queryParam = assign(this.getQuery(), {search: searchQuery});
		} else {
			queryParam = _.omit(this.getQuery(), 'search');
		}
		this.setState({input: searchQuery});
		this.replaceWith(this.getPathname(), this.getParams(), queryParam);
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
	_clearInput: function() {
		this.refs.searchField.getDOMNode().value = '';
		this.setState({input: ''});
		this.replaceWith(this.getPathname(), this.getParams(), _.omit(this.getQuery(), 'search'));
		
	}
});

