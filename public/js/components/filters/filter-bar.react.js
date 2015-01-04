var React = require('react'),
	OptGroup = require('./opt-group.react');

module.exports = React.createClass({
	render: function() {
		return (
			<section className='filter-bar'>
				<form data-group='group1'>
					<OptGroup group='category' items={['minions', 'spells']} onChange={this._onChange}/>
					<OptGroup group='class-unique' items={['hero','neutral']} onChange={this._onChange}/>
					<OptGroup group='mana' items={[1,2,3,4,5,6,7]} onChange={this._onChange}/>
				</form>
			</section>
		);
	},
	_onChange: function(groupName, props) {
		console.log(groupName, props);
	} 
});