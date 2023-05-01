const { cache, endpoint } = require('@chadkluck/cache-data');

/**
 * Connects to an external weather api and retrieves weather information
 * @returns {Response} weather information
 */
const get = async (connection) => {

	return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'content-type': 'application/json'}};

		try {

			let body = {};

			let conn = connection.toObject();

			if (conn.parameters.appid !== "") {

				let cacheCfg = connection.getCacheProfile("default");

				const cacheObj = await cache.CacheableDataAccess.getData(
					cacheCfg, 
					endpoint.getDataDirectFromURI,
					conn, 
					null
				);

				console.log(cacheObj.getBody(true));

				response.body = cacheObj.getBody(true);
			} else {
				response.body = { status: 404, message: "weather api key not set", app: 'weather' };
				response.statusCode = 404;
			}

			resolve( response );
			
		} catch (error) {
			console.log(error);
			response.body = { status: 500, message: 'error', app: 'weather' }
			response.statusCode = 500;
			reject( response );
        };

	});

};

module.exports = {
	get
};