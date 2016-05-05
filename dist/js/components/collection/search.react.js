var React = require('react'),
	Router = require('react-router'),
	assign = require('object-assign'),
	_ = require('lodash'),
	FilterStore = require('../../stores/filter-store'),
	FilterActions = require('../../actions/filter-actions');

module.exports = React.createClass({displayName: "exports",
	mixins: [
		Router.Navigation,
		Router.State
	],
	getInitialState: function() {
		var query = {
			input: this.getQuery().search || '' 
		};
		return query;
	},
	render: function() {
		var icon = 'fa-search'
		if (this.state.input !== '') {
			icon = 'fa-times';
		}

		return (
			React.createElement("div", {className: "search"}, 
				React.createElement("input", {className: "search__input", ref: "searchField", type: "text", value: this.state.input, onChange: this._onInput, onBlur: this._onBlur, onFocus: this._onFocus, onKeyPress: this._onKeyPress}), 
				React.createElement("i", {className: 'fa '+ icon +' search__icon', onClick: this._clearInput})
			)
		);
	},
	_onInput: function(e) {
		var searchQuery = this.refs.searchField.getDOMNode().value;
		this.setState({input: searchQuery});
		FilterActions.search(searchQuery, this);
		
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
		FilterActions.search('', this);
	}
});

