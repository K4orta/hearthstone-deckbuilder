 var AppDispatcher = require('../dispatcher/app-dispatcher'),
 	EventEmitter = require('events').EventEmitter,
 	cards = require('../../assets/collection.json'),
 	assign = require('object-assign'),
 	_ = require('lodash');

var _collection = cards,
	CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
	getAll: function() {
		console.log(_collection);
		return _collection;
	},
	get: function(options) {
		options = assign({
			filters: [] 
		}, options);
		
		var filteredCards = _.compose.apply(this, options.filters);

		return filteredCards(_collection);
	},
	getCard: function(id) {
		return _.findWhere(_collection, {id: id});
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

AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		default:
			return true;
	}

	Store.emitChange();
	return true;
});

module.exports = Store;
