var React = require('react'),
	_ = require('lodash'),
	ManaBar = require('./mana-bar.react'),
	DeckStore = require('../../stores/deck-store'),
	Router = require('react-router'),
	FilterActions = require('../../actions/filter-actions');

var manaBars = 7;

module.exports = React.createClass({
	mixins: [
		Router.State,
		Router.Navigation
	],
	componentDidMount: function() {
		DeckStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		var costCurve = this._calculateCurve(),
			costRatio = this._calculateRatio(costCurve);
		return {
			curve: costCurve,
			ratio: costRatio
		};
	},
	_calculateCurve: function() {
		return _.countBy(DeckStore.getCurrentDeck().cards, function(card) {
			return card.cost <= manaBars ? card.cost : manaBars; 
		});
	},
	_calculateRatio: function(curve) {
		var totalCards = 0;
		_.values(curve).forEach(function(value) {
			totalCards += value; 
		});

		var ratio = [];
		for (var i = 0; i <= manaBars; i += 1) {
			ratio[i] = curve[i] != null ? curve[i] / totalCards : 0;
		}

		return ratio;
	},
	render: function() {
		var bars = _.range(manaBars + 1).map(function(value) {
			return (
				<ManaBar label={value} manaClick={this._clickMana} ratio={this.state.ratio[value]} value={this.state.curve[value] != null ? this.state.curve[value] : 0} key={value} />
			);
		}.bind(this));

		return (
			<ul className='mana-curve'>
				{bars}
			</ul>
		);
	},
	_clickMana: function(e) {
		FilterActions.filterMana({
			mana: e.currentTarget.dataset.mana
		}, this);
	},
	_onChange: function() {
		var costCurve = this._calculateCurve(),
			costRatio = this._calculateRatio(costCurve);
		this.setState({
			curve: costCurve,
			ratio: costRatio
		});
	}
});