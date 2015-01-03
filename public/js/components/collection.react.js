var React = require('react'),
	_ = require('lodash'),
	Cards = require('../stores/card-store'),
	Pagination = require('./pagination.react'),
	CardList = require('./card-list.react'),
	Router = require('react-router'), 
	Search = require('./search.react'),
	Filters = require('../utils/card-filters');

var Collection = React.createClass({
	mixins: [Router.State],
	render: function() {
		var query = this.getQuery();
		var page = query.page || 1,
			hero = this.props.hero,
			perPage = 25;

		var filters = [
			Filters.filterByHero(hero),
			Filters.removeUncommon(),
			Filters.sortBy('mana')
		];

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