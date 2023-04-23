/**
 * Returns an object with lowercase keys. Note that if after
 * lowercasing the keys there is a collision one will be
 * over-written.
 * Can be used for headers, response, or more.
 * @param {Object} objectWithKeys 
 * @returns {Object} Same object but with lowercase keys
 */
const lowerCaseKeys = function (objectWithKeys) {
	let objectWithLowerCaseKeys = {};
	if ( objectWithKeys !== null ) {
		let keys = Object.keys(objectWithKeys); 
		// move each value from objectWithKeys to objectWithLowerCaseKeys
		keys.forEach( function( k ) { 
			objectWithLowerCaseKeys[k.toLowerCase()] = objectWithKeys[k]; 
		});            
	}
	return objectWithLowerCaseKeys;
};

/**
 * Returns an object with Camel Case keys. Note that if after
 * changing the keys there is a collision one will be
 * over-written.
 * Can be used for headers, response, or more.
 * @param {Object} objectWithKeys 
 * @returns {Object} Same object but with lowercase keys
 */
const titleCaseKebabKeys = function (objectWithKeys) {

	const toTitleCaseKebab = function (str) {
		return str.toLowerCase().split('-').map(function (word) {
			return (word.charAt(0).toUpperCase() + word.slice(1));
		}).join('-');
	};

	let objectWithNewKeys = {};
	if ( objectWithKeys !== null ) {
		let keys = Object.keys(objectWithKeys); 
		// move each value from objectWithKeys to objectWithLowerCaseKeys
		keys.forEach( function( k ) { 
			objectWithNewKeys[toTitleCaseKebab(k)] = objectWithKeys[k]; 
		});            
	}
	return objectWithNewKeys;
};

module.exports = {
	lowerCaseKeys,
    titleCaseKebabKeys
};