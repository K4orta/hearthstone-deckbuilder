var React = require('react'),
	DeckActions = require('../../actions/deck-actions'),
	Heroes = require('./hero-selector.react'),
	HeroStore = require('../../stores/hero-store'),
	_ = require('lodash'),
	cap = require('capitalize');

var createInstructions = 'Deck Name',
	createEmptyError = 'Enter a name first';


var Collection = React.createClass({displayName: "Collection",
	getInitialState: function() {
		return {
			menuOpen: false,
			hero: _.first(HeroStore.getAll()).playerClass
		};
	},
	render: function() {
		return (
			React.createElement("div", {className: "deck-index__controls"}, 
				React.createElement("button", {className: "btn deck-index__controls__new-deck", onClick: this._startCreate}, 
					React.createElement("i", {className: "fa fa-plus"}), " Create Deck"
				), 
				React.createElement("div", {className: 'deck-index__create-wrapper' + (this.state.menuOpen? ' is-open' : '')}, 
					React.createElement("div", {className: "create-wrapper__form-group"}, 
						React.createElement("label", {className: "create-wrapper__label"}, "Class:"), 
						React.createElement(Heroes, {ref: "heroSelect", onChange: this._heroSelectChange}), 
						React.createElement("label", {className: "create-wrapper__label"}, "Deck Name:"), 
						React.createElement("input", {type: "text", ref: "newDeck", placeholder: 'New ' + this.state.hero + ' Deck', onBlur: this._onBlur, onFocus: this._onFocus, onKeyPress: this._onKeyPress}, " ")
					), 

					React.createElement("div", {className: "create-wrapper__button-group"}, 
						React.createElement("button", {className: "btn deck-index__create-btn", onClick: this._createDeck}, 
							React.createElement("i", {className: "fa fa-check"}), " Create"
						), 
						React.createElement("button", {className: "btn", onClick: this._cancelCreate}, 
							React.createElement("i", {className: "fa fa-times"}), " Cancel"
						)
					)
				)
			)
		);
	},
	_heroSelectChange: function(e) {
		this.setState({
			hero: e.currentTarget.value
		})
	},
	_startCreate: function(e) {
		this.setState({
			menuOpen: !this.state.menuOpen
		});
	},
	_cancelCreate: function() {
		this.setState({
			menuOpen: false
		});
	},
	_createDeck: function(e) {
		var nameField = this.refs.newDeck.getDOMNode(),
			newDeckName = nameField.value,
			newDeckHero = this.refs.heroSelect.getDOMNode().value;

		if (newDeckName === '') {
			newDeckName = 'New ' + cap(newDeckHero) + ' Deck';
		}
		
		DeckActions.create(newDeckName, newDeckHero);
		nameField.value = '';
		nameField.setAttribute('placeholder', createInstructions);
		this.setState({
			menuOpen: false
		});
		
	},
	_onBlur: function(e) {
		document.querySelector('.deckbuilder').classList.remove('input-focused');
	},
	_onFocus: function(e) {
		document.querySelector('.deckbuilder').classList.add('input-focused');
	},
	_onKeyPress: function(e) {
		if(e.key === 'Enter') {
			this.refs.newDeck.getDOMNode().blur();
			this._createDeck();
		}
	}
});

module.exports = Collection;