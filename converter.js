/*
 * converter.js
 */

var fs = require('fs');
var sets = require('./public/assets/cards.json'),
	_ = require('lodash');

var filtered = [],
	heroes = [];

_.values(sets).forEach(function(set) {	
	set.forEach(function(card) {
		if (card.collectible && card.type !== 'Hero') {
			filtered.push(card);
		} else if (card.type === 'Hero' && card.collectible) {
			heroes.push(card);
		}
	});
}); 

filtered = _.sortBy(filtered, function(card) {
	return card.cost;
});

fs.writeFile('./public/assets/collection.json', JSON.stringify(filtered, undefined, 2));
fs.writeFile('./public/assets/hero.json', JSON.stringify(heroes, undefined, 2));