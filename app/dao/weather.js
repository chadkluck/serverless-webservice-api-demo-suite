const { tools, cache, endpoint } = require('@chadkluck/cache-data');

/**
 * Connects to an external weather api and retrieves weather information
 * @returns {Response} weather information
 */
const get = async (connection) => {

	return new Promise(async (resolve, reject) => {

		const timerTaskWeather = new tools.Timer("timerTaskWeather", true);

		try {

			let conn = connection.toObject();
			// conn.path = ""; // we will just use the path set in the connection details

			let body = {};

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

			timerTaskWeather.stop();
			resolve( body );
			
		} catch (error) {
			tools.DebugAndLog.error("taskWeather CacheController error", error);
			timerTaskWeather.stop();
			reject( { msg: "error" } );
		};

	});

};

module.exports = {
	get
};