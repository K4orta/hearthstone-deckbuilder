var React = require('react'),
	OptGroup = require('./opt-group.react'),
	Router = require('react-router'),
	assign = require('object-assign'),
	FilterActions = require('../../actions/filter-actions'),
	FilterStore = require('../../stores/filter-store'),
	_ = require('lodash');

module.exports = React.createClass({
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
			<section className='filter-bar'>
				<form data-group='group1'>
					<OptGroup group='category' selected={this.state.category} items={['minion', 'spell']} callback={this._onChange}/>
					<OptGroup group='class' selected={this.state.class} items={['hero','neutral']} callback={this._onChange}/>
					<OptGroup group='mana' selected={this.state.mana} items={['0','1','2','3','4','5','6','7']} callback={this._onChange}/>
				</form>
			</section>
		);
	},
	_onChange: function(props) {
		var update = _.pick(assign(this.state, props), 'category', 'class', 'mana');
		FilterActions.updateFilters(update, this);
		this.setState(update);
	} 
});