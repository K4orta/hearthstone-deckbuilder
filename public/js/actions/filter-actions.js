var AppDispatcher = require('../dispatcher/app-dispatcher'),
	FilterConstants = require('../constants/filters');

var FilterActions = {
	updateFilters: function(update, component) {
		AppDispatcher.handleViewAction({
			actionType: FilterConstants.FILTER_CHANGE,
			update: update,
			component: component
		});
	},
	search: function(input, component) {
		AppDispatcher.handleViewAction({
			actionType: FilterConstants.SEARCH_CHANGE,
			input: {
				search: input
			},
			component: component
		});	
	}
};

module.exports = FilterActions;
