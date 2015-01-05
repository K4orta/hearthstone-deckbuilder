var AppDispatcher = require('../dispatcher/app-dispatcher'),
	FilterConstants = require('../constants/filters');

var FilterActions = {
	updateFilters: function(update, component) {
		AppDispatcher.handleViewAction({
			actionType: FilterConstants.FILTER_CHANGE,
			update: update,
			component: component
		});
	}
};

module.exports = FilterActions;
