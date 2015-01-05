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
	search: function(input) {
		var lowerInput = input.toLowerCase()
		return function(cards) {
			return _.filter(cards, function(card) {
				return _.contains(card.name.toLowerCase(), lowerInput) 
				|| _.contains(card.race.toLowerCase(), lowerInput)
				|| _.contains(card.description.toLowerCase(), lowerInput);
			});
		};
	},
	category: function(input) {
		return function(cards) {
			return _.filter(cards, function(card) {
				return card.category === input;
			});
		};
	},
	'class': function(input) {
		return function(cards) {
			if (input === 'neutral') {
				return _.filter(cards, function(card) {
					return card.hero === 'neutral';
				});	
			} else {
				return _.reject(cards, function(card) {
					return card.hero === 'neutral';
				});	
			}
		};
	},
	mana: function(input) {
		return function(cards) {
			return _.filter(cards, function(card) {
				if (input >= 7 && card.mana >=7){
					return true;
				}
				return card.mana == input;
			});
		};
	},
	paginateCards: function(options) {
		var limit = options.perPage * (options.page + 1);
		return options.cards.slice(options.page * options.perPage, limit);
	},
};

module.exports = Filters;