const tools = require("../utils/tools.js");

const statusError = { status: 406, body: "I'm sorry, Dave, I'm afraid {{STATUS}} isn't a valid status code" };

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
    '504': 'Gateway Time-out',
    '505': 'HTTP Version not supported'
};


/**
 * 
 */
const getStatusCode = function (statusCode) {
	let obj = {statusCode: 200, message: "" };

	if ( `${statusCode}` in statusCodes ) {
		obj.statusCode = parseInt(statusCode, 10);
		obj.message = statusCodes[`${statusCode}`];
	} else {
		obj.statusCode = statusError.statusCode;
		obj.message = statusError.body.replace('{{STATUS}}', statusCode);
	}

	return obj;
};

const get = async (event) => {

	return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'Content-Type': 'application/json'}};

		try {

			console.log("EVENT", event);

			let eventHeaders = tools.lowerCaseKeys(event.headers);
			let eventParameters = tools.lowerCaseKeys(event.queryStringParameters);
					
			if ("status" in eventParameters) {
				const obj = getStatusCode(eventParameters.status);
				response.statusCode = obj.statusCode;

				if (response.statusCode === 301 || response.statusCode === 302) {
					response.headers = { Location: "https://api.chadkluck.net/games" };
				} else {
					response.body = { message: `${obj.statusCode} ${obj.message}` };
				}
			} else {
				let body = null;
				let status = 200;
				let headers = {};

				// Set Etag
				const serverEtag = ('etag' in eventParameters) ? eventParameters.etag : '';
				const requestEtag = ('if-none-match' in eventHeaders) ? eventHeaders['if-none-match'] : '';

				// Set Modified Since
				const serverModifiedSince = ('lastmodified' in eventParameters) ? eventParameters.lastmodified : 1;
				const requestModifiedSince = ('if-modified-since' in eventHeaders) ? eventHeaders['if-modified-since'] : 0;

				// Return value for modified or etag
				if ( requestEtag !== '' && (requestEtag === serverEtag || requestModifiedSince >= serverModifiedSince)) {
					status = 304;
				}

				if (status === 200) {

					// if a body was sent without an explicit body=false in query string then we echo the body
					if ("body" in event && event.body !== null && !('body' in eventParameters && eventParameters.body.toLowerCase() === "false")) {
						try {
							body = JSON.parse(event.body); // JSON
						} catch (e) {
							body = event.body; // TEXT
							headers['Content-Type'] = "text/html";
						}
					} else {
						body = {
							statusCode: status,
							statusMessage: statusCodes[`${status}`],
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

				response.statusCode = status;
				response.body = body;
				response.headers = tools.titleCaseKebabKeys(headers);
				
			}

			resolve( response );
					
		} catch (error) {
			response.body = { app: 'echo', message: 'error' }
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