var React = require('react'),
	FilterOption = require('./filter-option.react');

module.exports = React.createClass({
	getInitialState: function() {
		return {

		};
	},
	render: function() {
		return (
			<section className='filter-bar'>
				<form>
					<FilterOption name='minions' ref='minions' callback={this._filterCheck} />
					<FilterOption name='spells' ref='spells' callback={this._filterCheck} />
				</form>
			</section>
		);
	},
	_filterCheck: function(e) {
		// console.log(this.refs.minions);
		this.refs.minions._switchOn();
	},
	_onChange: function() {

	} 
});