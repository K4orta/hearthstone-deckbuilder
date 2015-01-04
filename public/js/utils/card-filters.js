var _ = require('lodash');

var Filters = {
	sortBy: function(propertyName) {
		return function(cards) {
			return _.sortBy(cards, function(card) {
				return card[propertyName];
			});
		};
	},
	removeUncommon: function() {
		return function(cards) {
			return _.reject(cards, function(card) {
				return card.collectible === false;
			});
		};
	},
	filterByHero: function(heroSlug) {
		return function(cards) {
			if (heroSlug == null) {
				return cards;
			} 
			return _.filter(cards, function(card) {
				return card.hero === 'neutral' || card.hero === heroSlug;
			});
		};
	},
	filterBySearch: function(input) {
		var lowerInput = input.toLowerCase()
		return function(cards) {
			return _.filter(cards, function(card) {
				return _.contains(card.name.toLowerCase(), lowerInput) 
				|| _.contains(card.race.toLowerCase(), lowerInput)
				|| _.contains(card.description.toLowerCase(), lowerInput);
			});
		};
	},
	paginateCards: function(options) {
		var limit = options.perPage * (options.page + 1);
		return options.cards.slice(options.page * options.perPage, limit);
	},
};

module.exports = Filters;