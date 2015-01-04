var React = require('react'),
	_ = require('lodash'),
	Cards = require('../../stores/card-store'),
	Pagination = require('./pagination.react'),
	CardList = require('./card-list.react'),
	Router = require('react-router'), 
	Search = require('./search.react'),
	Filters = require('../../utils/card-filters'),
	DeckStore = require('../../stores/deck-store');

var Collection = React.createClass({
	mixins: [Router.State],
	getInitialState: function() {
		return {
			hero: DeckStore.getCurrentDeck().deckType,
		};
	},
	componentDidMount: function() {
		DeckStore.addChangeListener(this._onChange);
	},
	_onChange: function() {
		var newHero = DeckStore.getCurrentDeck().deckType;

		// Don't rerender the whole list if nothing changed
		if (newHero !== this.state.hero) {
			this.setState({
				hero: DeckStore.getCurrentDeck().deckType,
			});
		}
	},
	render: function() {
		var filters = [
			Filters.removeUncommon(),
			Filters.filterByHero(this.state.hero),
			Filters.sortBy('mana')
		];

		var query = this.getQuery();
		if (query.search) {
			filters.push(Filters.filterBySearch(query.search));
		}

		var filteredCards = Cards.get({
			filters: filters
		});

		// var paginatedCards = this._paginateCards({
		// 	cards: filteredCards,
		// 	perPage: perPage,
		// 	page: page - 1 
		// });
		//<Pagination data={_.range(parseInt(filteredCards.length / perPage) + 1)} currentPage={page} />

		return (
			<section className='collection-view'>
				<div className='collection-tools'>
					<Search/>
				</div>
				<CardList data={filteredCards} />
			</section>
		);
	}
});

module.exports = Collection;