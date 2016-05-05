var React = require('react'),
	OptGroup = require('./opt-group.react'),
	Router = require('react-router'),
	assign = require('object-assign'),
	FilterActions = require('../../actions/filter-actions'),
	FilterStore = require('../../stores/filter-store'),
	_ = require('lodash');

module.exports = React.createClass({displayName: "exports",
	mixins: [
		Router.Navigation,
		Router.State
	],
	getInitialState: function() {
		var update = _.pick(this.getQuery(), 'category', 'class', 'mana');
		return update;
	},
	componentDidMount: function() {
		FilterStore.addChangeListener(function() {
			this.setState(FilterStore.getAll());
		}.bind(this));
	},
	render: function() {
		return (
			React.createElement("section", {className: "filter-bar"}, 
				React.createElement("form", {"data-group": "group1"}, 
					React.createElement(OptGroup, {group: "category", selected: this.state.category, items: ['Minion', 'Spell'], callback: this._onChange}), 
					React.createElement(OptGroup, {group: "class", selected: this.state.class, items: ['hero','neutral'], callback: this._onChange}), 
					React.createElement(OptGroup, {group: "mana", selected: this.state.mana, items: ['0','1','2','3','4','5','6','7'], callback: this._onChange})
				)
			)
		);
	},
	_onChange: function(props) {
		var update = _.pick(assign(this.state, props), 'category', 'class', 'mana');
		FilterActions.updateFilters(update, this);
		this.setState(update);
	} 
});