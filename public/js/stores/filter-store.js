 var AppDispatcher = require('../dispatcher/app-dispatcher'),
 	EventEmitter = require('events').EventEmitter,
 	assign = require('object-assign'),
 	FilterContants = require('../constants/filters'),
 	_ = require('lodash'),
 	Filters = require('../utils/card-filters');

var _filters = {},
	CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return _filters;
	},
	getFilters: function(hero) {
		var filters = [
			Filters.filterByHero(hero)
		];
		console.log(hero);

		for (var a in _filters) {
			filters.push(Filters[a](_filters[a]));
		}

		filters.push(Filters.sortBy('mana'));

		return filters; 
	},
	setFilters: function(input) {
		_filters = assign(_filters, input);
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

var cleanFilters = function() {
	for (var a in _filters) {
		if (_filters[a] == null || _filters[a] === '') {
			delete _filters[a];
		}
	}
}

var changeFilter = function(action) {
	_filters = assign(_filters, action.update);
	cleanFilters();
	replaceQuery(action.component, _filters, ['category','class','mana']);
};

var changeSearch = function(action) {
	_filters = assign(_filters, action.input || '');
	cleanFilters();
	replaceQuery(action.component, _filters, ['search']);
};

AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case FilterContants.FILTER_CHANGE:
			changeFilter(action);
			break;
		case FilterContants.SEARCH_CHANGE:
			changeSearch(action);
			break;
		default:
			return true;
	}

	Store.emitChange();
	return true;
});

module.exports = Store;