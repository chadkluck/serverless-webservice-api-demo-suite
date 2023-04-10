const get = async (event) => {

	return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'content-type': 'application/json'}};

		try {
					
			const statusCode = ("X-StatusCode" in event.headers) ? parseInt(event.headers['X-StatusCode'], 10) : 200;
			const redirect = (statusCode >= 300 && statusCode <= 399) ? "https://api.chadkluck.net/games" : "";

			let body = (redirect) ? null : JSON.stringify({
				protocol: event.requestContext.protocol,
				method: event.requestContext.httpMethod,
				host: event.requestContext.domainName,
				path: event.requestContext.path,
				headers: event.headers,
				parameters: ("queryStringParameters" in event) ? event.queryStringParameters : {},
				body: ("body" in event) ? event.body : null,
				ip: event.requestContext.identity.sourceIp,
				userAgent: event.requestContext.identity.userAgent
			});
			
			let headers = ( redirect ) ? {Location: redirect } : { "content-type": "application/json" };
			
			response = {
				statusCode: statusCode,
				body: body,
				headers: headers
			};
			resolve( response );
					
		} catch (error) {
			response.body = { app: 'ball', message: 'error' }
			response.statusCode = 500;
			reject( response );
		};

	});

};