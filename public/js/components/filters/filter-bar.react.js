var React = require('react'),
	OptGroup = require('./opt-group.react'),
	Router = require('react-router'),
	assign = require('object-assign'),
	FilterActions = require('../../actions/filter-actions');

module.exports = React.createClass({
	mixins: [
		Router.Navigation,
		Router.State
	],
	getInitialState: function() {
		return {
			category: {
				minion: false,
				spell: false
			},
			'class': {
				hero: false,
				neutral: false
			},
			mana: {
				0: false,
				1: false,
				2: false,
				3: false,
				4: false,
				5: false,
				6: false,
				7: false
			}
		};
	},
	render: function() {
		var groups = [];

		return (
			<section className='filter-bar'>
				<form data-group='group1'>
					<OptGroup group='category' items={['minion', 'spell']} callback={this._onChange}/>
					<OptGroup group='class' items={['hero','neutral']} callback={this._onChange}/>
					<OptGroup group='mana' items={[0,1,2,3,4,5,6,7]} callback={this._onChange}/>
				</form>
			</section>
		);
	},
	_onChange: function(groupName, props) {
		var update = {};
		update[groupName] = props;
		FilterActions.updateFilters(update, this);
		this.setState(update);
	} 
});