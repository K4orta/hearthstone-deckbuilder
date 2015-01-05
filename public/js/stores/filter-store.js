 var AppDispatcher = require('../dispatcher/app-dispatcher'),
 	EventEmitter = require('events').EventEmitter,
 	assign = require('object-assign'),
 	FilterContants = require('../constants/filters'),
 	_ = require('lodash'),
 	Filters = require('../utils/card-filters');


var _filters = {},
	_shortFilters = {},
	CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return _filters;
	},
	getFilters: function(hero) {
		var filters = [
			Filters.removeUncommon(),
			Filters.filterByHero(hero)
		];

		for (var a in _shortFilters) {
			filters.push(Filters[a](_shortFilters[a]));
		}

		filters.push(Filters.sortBy('mana'));

		return filters; 
	},
	setShortFilters: function(input) {
		_shortFilters = input;
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},
	addChangeListener: function(callback) {
		this.addListener(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

var replaceQuery = function(provider, query, blacklist) {
	var filterdQuery = _.omit(provider.getQuery(), blacklist);
	
	provider.replaceWith(
		provider.getPathname(), 
		provider.getParams(), 
		assign(filterdQuery, query)
	);
};

var compactFilterList = function(filters) {
	var stack = {};
	for (var a in filters) {
		for (var b in filters[a]) {
			if (filters[a][b] === true) {
				stack[a] = b;
				break;
			}
		}
	}
	return stack;
};

var changeFilter = function(action) {
	_filters = assign(_filters, action.update);
	_shortFilters = compactFilterList(_filters);
	replaceQuery(action.component, _shortFilters, ['category','class','mana']);
};

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case FilterContants.FILTER_CHANGE:
			changeFilter(action);
			break;
		default:
			return true;
	}

	Store.emitChange();
	return true;
});

module.exports = Store;