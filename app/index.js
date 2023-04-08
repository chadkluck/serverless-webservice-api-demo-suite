/* 
*******************************************************************************
Serverless Demo Suite with internal Cache Restful API
*******************************************************************************

Version: 0.1.0-2023-04-04-1800
Last Modified: 2023-04-04
Author: Chad Leigh Kluck

GitHub: https://github.com/chadkluck

-------------------------------------------------------------------------------

This is a demo for an AWS Lambda function that provides api services
via API Gateway. Internal caching utilizes DynamoDb and S3.

-------------------------------------------------------------------------------

For other notes and info, refer to README.md
		
*******************************************************************************
*/

"use strict";

const { tools } = require('@chadkluck/cache-data');
const { ball, eluna, umwug, games, weather, test, root, echo } = require('./dao/index.js');
const obj = require("./classes.js");

/* increase the log level - comment out when not needed  */
tools.DebugAndLog.setLogLevel(5, "2025-10-30T04:59:59Z"); // we can increase the debug level with an expiration

/* log a cold start and keep track of init time */
const coldStartInitTimer = new tools.Timer("coldStartTimer", true);

/* initialize the Config */
obj.Config.init(); // we need to await completion in the async call function - at least until node 14

/**
 * Lambda function handler
 * 
 * @param {object} event Lambda event - doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {object} context Lambda context - doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {object} callback Callback function to submit response
 * @returns {object} API Gateway Lambda Proxy Output Format doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 */
exports.handler = async (event, context, callback) => {

	try {

		/* wait for CONFIG to be settled as we need it before continuing. */
		await obj.Config.promise();

		/* If the cold start init timer is running, stop it and log. This won't run again until next cold start */
		if (coldStartInitTimer.isRunning()) { tools.DebugAndLog.log(coldStartInitTimer.stop(),"COLDSTART"); }

		/* Process the request and wait for result */
		const response = await processRequest(event, context);

		/* Send the result back to API Gateway */
		callback(null, response);

	} catch (error) {

		/* This should never happen as processRequest() does it's own handling.
		This is an error outside of processRequest() and is usually a syntax
		error during dev/test stages */

		/* Log the error */
		tools.DebugAndLog.error("500 | Unhandled Execution Error", error);
		
		/* return an error message to API Gateway */
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Error initializing request - 1701-D' // 1701-D just so we know it is an app and not API Gateway error
			}),
			headers: {'content-type': 'application/json'}
		};

	}

};

/**
 * Process the request
 * 
 * @param {array} event The event passed to the lambda function
 * @param {array} context The context passed to the lambda function
 */
const processRequest = async function(event, context) {

	/**
	 * Contains information about the request event
	 */
	const REQ = new obj.Request(event);

	/**
	 * Timer used for logging execution time
	 */
	const timer = new tools.Timer("Response timer", true);

	/* 
	*******************************************************************************
	Log Methods
	*******************************************************************************
	*/

	/**
	 * Log the response. Sends to obj.Log.response()
	 * @param {object} response
	 */
	const logResponse = async function(response) {
		obj.Log.response(response, timer.elapsed(), REQ);
	};

	/**
	 * Log an error. Sends to obj.Log.critical()
	 * @param {string} text 
	 * @param {object} pObj 
	 */
	const logCritical = async function( text, pObj = null) {
		obj.Log.critical( text, pObj, REQ );
	};

	/* 
	*******************************************************************************
	Response Methods
	*******************************************************************************
	*/

	/**
	 * Generate an error response (execution errors)
	 * This is generated if unrecoverable errors are thrown during execution.
	 * Possible errors include inability to access DynamoDB, improper requests,
	 * or any other error that is caught, but can't result in proper execution.
	 * @param {Error} e 
	 * @param {String} statusCode 
	 * @returns {object} A final response that is an error
	 */
	const generateErrorResponse = function (e, statusCode = "400") {

		// put the error message in the body, format it to a specification
		var body = { errors: [{ code: statusCode, type: "Error", message: e.message }]};

		var contentType = "application/json";
		body = JSON.stringify(body);

		var headers = { 
			"content-type": contentType,
			"access-control-allow-origin": "*",
			"expires": (new Date(Date.now() + (process.env.errorExpiresInSeconds * 1000))).toUTCString(),
			"cache-control": "public, max-age="+process.env.errorExpiresInSeconds
		}; 

		// send the error message to the console as obj.Log.critical bypasses any debug silencer
		logCritical(statusCode + " " + e.message);

		var response = {statusCode: statusCode, headers: headers, body: body };

		return response;
	};

	/* 
	*******************************************************************************
	Request Execution Container
	*******************************************************************************
	*/

	/**
	 * Execution container for all main logic
	 * @returns {object} response for API Gateway
	 */
	const execute = async function () {

		/*
		=======================================================================
		Main
		*/

		/**
		 * Main function for the app that controls tasks and assembles the 
		 * api response
		 * @returns {object} response for API Gateway
		 */
		const main = async () => {

			const timerMain = new tools.Timer("Main", true);

			return new Promise(async (resolve, reject) => {

				try {
					
					/* Tasks - We will be calling only 1 api, but this allows us to call multiple simultanously in future. */
					let appTasks = []; // we'll collect the tasks and their promises here

					const id = event.pathParameters.id;
					const code = ('code' in event.queryStringParameters) ? event.queryStringParameters.code : null;

					switch (id) {
						case 'ball':
							appTasks.push(ball.get(code));
							break;
						case 'eluna':
							appTasks.push(eluna.get(code));
							break;
						case 'games':
							appTasks.push(games.get(code));
							break;
						case 'umwug':
							appTasks.push(umwug.get(code));
							break;
						case 'test':
							appTasks.push(test.get(event));
							break;
						case 'echo':
							appTasks.push(echo.get(event));
							break;
						case 'weather':
							// add event.queryStringParameters to conn
							appTasks.push(weather.get(obj.Config.getConnection("weather")));
							break;
						default:
							//appTasks.push(taskTest());
							appTasks.push(root.get(event));
							break;
					}

					tools.DebugAndLog.debug("EVENT", {event, context});

					/* this will return everything promised into an indexed array */
					let appCompletedTasks = await Promise.all(appTasks);

					let response = {
						statusCode: 200,
						body: JSON.stringify(appCompletedTasks[0]),
						headers: {'content-type': 'application/json'}
					};

					timerMain.stop();

					resolve(response);

				} catch (error) {
					tools.DebugAndLog.error("Main error", error);
					response = generateErrorResponse(new Error("Application encountered an error. Main", "500"));
					timerMain.stop();
					reject( response );
				};
			});
		};

		return await main();

	};

	/* 
	===========================================================================
	processRequest() code
	*/
	
	tools.DebugAndLog.debug("Received event", event);
	// this will hold the final response we send back to the calling handler
	let functionResponse = null;

	try {

		if (REQ.isValid()) {
			functionResponse = await execute();
		} else {
			functionResponse = generateErrorResponse(new Error("Invalid request", "403"));
		}
		
	} catch (error) {
		tools.DebugAndLog.error("Fatal error", error);
		functionResponse = generateErrorResponse(new Error("Application encountered an error. Twenty Two", "500"));
	}

	logResponse(functionResponse);
	return functionResponse;

};