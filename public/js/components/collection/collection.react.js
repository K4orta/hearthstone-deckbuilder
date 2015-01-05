var React = require('react'),
	_ = require('lodash'),
	Cards = require('../../stores/card-store'),
	Pagination = require('./pagination.react'),
	FilterBar = require('../filters/filter-bar.react')
	CardList = require('./card-list.react'),
	Router = require('react-router'), 
	Search = require('./search.react'),
	DeckStore = require('../../stores/deck-store'),
	FilterStore = require('../../stores/filter-store');

var Collection = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		FilterStore.setFilters(_.pick(this.getQuery(), 'category', 'class', 'mana', 'search'));
		return {
			hero: DeckStore.getCurrentDeck().deckType,
		};
	},
	componentDidMount: function() {
		DeckStore.addChangeListener(this._onDeckChange);
		FilterStore.addChangeListener(this._onFilterChange);
	},
	render: function() {
		var filteredCards = Cards.get({
			filters: FilterStore.getFilters(this.state.hero)
		});
		return (
			<section className='collection-view'>
				<div className='collection-tools'>
					<Search />
					<FilterBar ref='filterBar'/>
					<button className='collection-tools__filter-btn' onClick={this._toggleFilterMenu}>
						<i className='fa fa-filter'/>
					</button>
				</div>
				<CardList data={filteredCards} />
			</section>
		);
	},
	_toggleFilterMenu: function() {
		this.refs.filterBar.getDOMNode().classList.toggle('filters-open');
	},
	_onFilterChange: function() {

	},
	_onDeckChange: function() {
		var newHero = DeckStore.getCurrentDeck().deckType;

		// Don't rerender the whole list if nothing changed
		if (newHero !== this.state.hero) {
			this.setState({
				hero: DeckStore.getCurrentDeck().deckType,
			});
		}
	},
});

module.exports = Collection;