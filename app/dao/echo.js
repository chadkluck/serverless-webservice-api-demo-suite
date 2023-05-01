const tools = require("../utils/tools.js");

const statusError = { status: 406, message: "I'm sorry, Dave, I'm afraid {{STATUS}} isn't a valid status code" };

const statusCodes = {
    '100': 'Continue',
    '101': 'Switching Protocols',
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Moved Temporarily',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Time-out',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Request Entity Too Large',
    '414': 'Request-URI Too Large',
    '415': 'Unsupported Media Type',
    '418': 'I\'m a teapot',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported'
};


/**
 * 
 * @param {number} statusCode 
 * @returns {{status: number, message: string}}
 */
const getStatusCode = function (statusCode) {
	let obj = {status: 200, message: "" };

	if ( `${statusCode}` in statusCodes ) {
		obj.status = parseInt(statusCode, 10);
		obj.message = statusCodes[`${statusCode}`];
	} else {
		obj.status = statusError.status;
		obj.message = statusError.message.replace('{{STATUS}}', statusCode);
	}

	return obj;
};

/**
 * Receive an HTTP Request and return a response defined in that request
 * 
 * @param {object} event Lambda Event Object
 * @returns {{statusCode: number, body: object, headers: object}} HTTP Response Object
 */
const get = async (event) => {

	let response = {statusCode: 200, body: null, headers: {'Content-Type': 'application/json'}};

	return new Promise(async (resolve, reject) => {

		try {

			let eventHeaders = tools.lowerCaseKeys(event.headers);
			let eventParameters = tools.lowerCaseKeys(event.queryStringParameters);
					
			if ("status" in eventParameters) {
				const obj = getStatusCode(eventParameters.status);
				response.statusCode = obj.status;

				if (response.statusCode === 301 || response.statusCode === 302) {
					response.headers = { Location: "https://api.chadkluck.net/games" };
				} else {
					if ( !('accept' in eventHeaders) || ('accept' in eventHeaders && eventHeaders['accept'] !== 'text/plain' ) ) {
						response.body = { status: obj.status, message: obj.message }
					} else {
						response.body = `${obj.status} ${obj.message}`;
						response.headers['Content-Type'] = 'text/plain';
					}
				}

			} else {

				// Set Etag
				const serverEtag = ('etag' in eventParameters) ? eventParameters.etag : '';
				const requestEtag = ('if-none-match' in eventHeaders) ? eventHeaders['if-none-match'] : '';

				let serverLastModified = null;
				let requestModifiedSince = null;
				
				// Set Modified Since
				try {
					serverLastModified = ('lastmodified' in eventParameters 
						&& eventParameters.lastmodified !== undefined
						&& eventParameters.lastmodified !== null 
						&& eventParameters.lastModified !== '' ) ? new Date(Date.parse(eventParameters.lastmodified)) : null;
					requestModifiedSince = ('if-modified-since' in eventHeaders
						&& eventHeaders['if-modified-since'] !== undefined
						&& eventHeaders['if-modified-since'] !== null
						&& eventHeaders['if-modified-since'] !== '') ? new Date(Date.parse(eventHeaders['if-modified-since'])) : null;
						
						console.log({serverLastModified,  requestModifiedSince});
				} catch (error) {
					// ignore - date parse error
					console.error(error);
				}

				// Set status if Not Modified
				if ( (requestEtag !== '' && serverEtag !== '' && requestEtag === serverEtag) 
					|| (serverLastModified !== null && requestModifiedSince !== null && requestModifiedSince > serverLastModified)) {
					response.statusCode = 304;
				}

				// Set Etag if we received one
				if (serverEtag !== '') {
					response.headers['ETag'] = serverEtag;
				}

				// Set Last Modified if we received one
				if (serverLastModified !== null) {
					response.headers['Last-Modified'] = serverLastModified.toUTCString();
				}

				if (response.statusCode === 200) {

					// if a body was sent without an explicit body=false in query string then we echo the body
					if ("body" in event && event.body !== null && !('body' in eventParameters && eventParameters.body.toLowerCase() === "false")) {
						try {
							response.body = JSON.parse(event.body); // JSON
						} catch (e) {
							response.body = event.body; // TEXT
							response.headers['Content-Type'] = "text/html";
						}
					} else if (requestEtag !== '' || serverEtag !== '' || serverLastModified !== null || requestModifiedSince !== null ) {
						response.body = { greeting: 'Hello, World!' };
					} else {
						response.body = {
							statusCode: response.statusCode,
							statusMessage: statusCodes[`${response.statusCode}`],
							requestInfo: {
								protocol: event.requestContext.protocol,
								method: event.requestContext.httpMethod,
								host: event.requestContext.domainName,
								path: event.requestContext.path,
								headers: event.headers,
								parameters: ("queryStringParameters" in event) ? event.queryStringParameters : {},
								ip: event.requestContext.identity.sourceIp,
								userAgent: event.requestContext.identity.userAgent,
								body: ("body" in event) ? event.body : null
							}
						};

					}
				};
			}
			
			response.headers = tools.titleCaseKebabKeys(response.headers);

			resolve( response );
					
		} catch (error) {
			console.log(error);
			response.body = { status: 500, message: 'error', app: 'echo' }
			response.statusCode = 500;
			reject( response );
        };

	});

};

module.exports = {
	statusCodes,
	getStatusCode,
	get
};