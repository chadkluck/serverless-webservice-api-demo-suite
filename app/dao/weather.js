const { tools, cache, endpoint } = require('@chadkluck/cache-data');

/**
 * Connects to an external weather api and retrieves weather information
 * @returns {Response} weather information
 */
const get = async (connection) => {

	return new Promise(async (resolve, reject) => {

		const timerTaskWeather = new tools.Timer("timerTaskWeather", true);

		let response = {statusCode: 200, body: null, headers: {'content-type': 'application/json'}};

		try {

			let body = {};

			let conn = connection.toObject();
			// conn.path = ""; // we will just use the path set in the connection details


			if (conn.parameters.appid !== "") {

				let cacheCfg = connection.getCacheProfile("default");

				const cacheObj = await cache.CacheableDataAccess.getData(
					cacheCfg, 
					endpoint.getDataDirectFromURI,
					conn, 
					null
				);

				body = cacheObj.getBody(true);
			} else {
				body = { message: "weather api key not set" };
			}

			response.body = body;

			timerTaskWeather.stop();

			resolve( response );
			
		} catch (error) {
			tools.DebugAndLog.error("taskWeather CacheController error", error);
			timerTaskWeather.stop();
			response.body = { app: 'weather', message: 'error' }
			response.statusCode = 500;
			reject( response );
		};

	});

};

module.exports = {
	get
};