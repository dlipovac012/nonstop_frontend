/**
 * Helper function that constructs a query string out of the object
 * 
 * @param {Object} queryObject
 * @returns {String}
*/
export function constructQuery(queryObject) {
	return Object.entries(queryObject).reduce(function queryGenerator(acc, [key, value]) {
		return acc += `${key}=${value}&`;
	}, '').slice(0, -1);
}

/**
 * Capitalize first letter in the word
*/
export function capitalizeWord(word) {
	return word[0].toUpperCase() + word.slice(1);
}

/**
 * Deep equality of the object
*/
export function deepEqual(object1, object2) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
  
	if (keys1.length !== keys2.length) {
		return false;
	}
  
	for (const key of keys1) {
		const val1 = object1[key];
		const val2 = object2[key];
		const areObjects = isObject(val1) && isObject(val2);
		if (
			areObjects && !deepEqual(val1, val2) ||
		!areObjects && val1 !== val2
		) {
			return false;
		}
	}
  
	return true;
}
  
function isObject(object) {
	return object != null && typeof object === 'object';
}