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

const get = async (event) => {

	return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'content-type': 'application/json'}};

		try {
					
			const statusCode = ("X-StatusCode" in event.headers) ? parseInt(event.headers['X-StatusCode'], 10) : 200;

			if ( !(`${statusCode}` in statusCodes) ) {
				response.statusCode = statusError.statusCode;
				response.body = { message: statusError.body.replace('{{STATUS}}', statusCode) };
			} else {
				const redirect = (statusCode === 301 || statusCode === 302) ? "https://api.chadkluck.net/games" : "";
				let body = null;
				let headers = ( redirect ) ? {Location: redirect } : { "Content-Type": "application/json" };
				let status = statusCode;

				// lowercase the headers
				// TODO
				let req = {
					parameters: {},
					headers: {}
				};

				// Set Etag
				const serverEtag = ('etag' in req.parameters) ? req.parameters.etag : '';
				const requestEtag = ('if-none-match' in req.headers) ? req.headers['if-none-match'] : '';

				// Set Modified Since
				const serverModifiedSince = ('lastmodified' in req.parameters) ? req.parameters.lastmodified : 1;
				const requestModifiedSince = ('if-modified-since' in req.headers) ? req.headers['if-modified-since'] : 0;

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
						body: ("body" in event) ? event.body : null,
						ip: event.requestContext.identity.sourceIp,
						userAgent: event.requestContext.identity.userAgent						
					}
				};

				response.statusCode = status;
				response.body = body;
				response.headers = headers;
				
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