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

const get = async (event) => {

	return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'Content-Type': 'application/json'}};

		try {

			console.log("EVENT", event);

			let eventHeaders = lowerCaseKeys(event.headers);
			let eventParameteters = lowerCaseKeys(event.queryStringParameters);
					
			let statusCode = ("statuscode" in eventParameteters) ? parseInt(eventParameteters['statuscode'], 10) : 200;

			console.log("StatusCode: "+statusCode);

			if ( !(`${statusCode}` in statusCodes) ) {
				response.statusCode = statusError.statusCode;
				response.body = { message: statusError.body.replace('{{STATUS}}', statusCode) };
			} else {
				const redirect = (statusCode === 301 || statusCode === 302) ? "https://api.chadkluck.net/games" : "";
				let body = null;
				let headers = ( redirect ) ? { Location: redirect } : { "Content-Type": "application/json" };
				let status = statusCode;

				// Set Etag
				const serverEtag = ('etag' in eventParameteters) ? eventParameteters.etag : '';
				const requestEtag = ('if-none-match' in eventHeaders) ? eventHeaders['if-none-match'] : '';

				// Set Modified Since
				const serverModifiedSince = ('lastmodified' in eventParameteters) ? eventParameteters.lastmodified : 1;
				const requestModifiedSince = ('if-modified-since' in eventHeaders) ? eventHeaders['if-modified-since'] : 0;

				// Return value for modified or etag
				if ( requestEtag === serverEtag || requestModifiedSince >= serverModifiedSince) {
					status = 304;
				}

				body = (redirect) ? null : {
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

				response.statusCode = status;
				response.body = body;
				response.headers = titleCaseKebabKeys(headers);
				
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
	get
};