import { constructQuery } from './helpers';

/**
 * Network manager singleton
*/
function NetworkManager() {
	this.instance = null;
	// this.apiUrl = 'http://localhost:8000/api';
	this.apiUrl = process.env.API_URL;

	/**
	 * Generic GET HTTP method
	 * 
	 * @param {String} url - endpoint url
	 * @param {Object} query - all query parameters
	 */
	NetworkManager.prototype.get = function get(url, query) {
		return fetch(`${this.apiUrl}${url}?${constructQuery({ ...query })}`, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(res => res.json())
			.catch(err => {
				throw new Error(err.message);
			});
	};
}

/**
 * Initiate Network manager
*/
function init() {
	if (!NetworkManager.instance) {
		NetworkManager.instance = new NetworkManager();
		return NetworkManager.instance;
	}
	return new NetworkManager();

}
const instance = init();
Object.freeze(instance);

export default instance;