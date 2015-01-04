 var AppDispatcher = require('../dispatcher/app-dispatcher'),
 	EventEmitter = require('events').EventEmitter,
 	assign = require('object-assign');
var _filters = {},
	CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
	getAll: function() {
		return _filters;
	},
	emitChange: function() {
		this.emitChange(CHANGE_EVENT);
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