var React = require('react'),
	_ = require('lodash'),
	Cards = require('../stores/card-store'),
	Pagination = require('./pagination.react'),
	CardList = require('./card-list.react'),
	Router = require('react-router'), 
	Search = require('./search.react');

var Collection = React.createClass({
	mixins: [Router.State],
	_sortBy: function(propertyName) {
		return function(cards) {
			return _.sortBy(cards, function(card) {
				return card[propertyName];
			});
		};
	},
	_removeUncommon: function() {
		return function(cards) {
			return _.reject(cards, function(card) {
				return card.collectible === false;
			});
		};
	},
	_filterByHero: function(heroSlug) {
		return function(cards) {
			return _.filter(cards, function(card) {
				return card.hero === 'neutral' || card.hero === heroSlug;
			});
		};
	},
	_filterBySearch: function(input) {
		return function(cards) {
			return cards;
		};
	},
	_paginateCards: function(options) {
		var limit = options.perPage * (options.page + 1);
		return options.cards.slice(options.page * options.perPage, limit);
	},
	render: function() {
		var page = this.getQuery().page || 1,
			hero = this.props.hero,
			perPage = 25;

		var filteredCards = Cards.get({
			filters: [
				this._filterByHero(hero),
				this._removeUncommon(),
				this._sortBy('mana')
			]
		});

		// var paginatedCards = this._paginateCards({
		// 	cards: filteredCards,
		// 	perPage: perPage,
		// 	page: page - 1 
		// });
		//<Pagination data={_.range(parseInt(filteredCards.length / perPage) + 1)} currentPage={page} />

		return (
			<section className='collection-view'>
				<Search/>
				<CardList data={filteredCards} />
			</section>
		);
	}
});

module.exports = Collection;