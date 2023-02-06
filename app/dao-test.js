
const statusError = { status: '406', body: "I'm sorry, Dave, I'm afraid {{STATUS}} isn't a valid status code" };

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

const data = function (headers, body, parameters) {

    let status = ('status' in parameters) ? parameters.status : null;

    // lowercase the headers
    // TODO

    // Set Etag
    const serverEtag = ('etag' in parameters) ? parameters.etag : '';
    const requestEtag = ('if-none-match' in headers) ? headers['if-none-match'] : '';

    // Set Modified Since
    const serverModifiedSince = ('lastmodified' in parameters) ? parameters.lastmodified : 1;
    const requestModifiedSince = ('if-modified-since' in headers) ? headers['if-modified-since'] : 0;

    // Return value for modified or etag
    if ( requestEtag === serverEtag || requestModifiedSince >= serverModifiedSince) {
        status = '304';
    }

    if (status === null) {
        status = '200';
    }

    // Set status code
    let returnStatus = { status: '200', body: statusCodes['200'] };
    returnStatus = ('status' in parameters && parameters.status in statusCodes) ? { status: parameters.status, body: statusCodes[parameters.status] } : statusError; 
    if (returnStatus.status === statusError.status) { statusError.body = statusError.body.replace('{{STATUS}}', parameters.status)};

/*
    $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');
	$headerMsg = $protocol . ' ' . $status . ' ' . $text;

	// example: HTTP/1.0 404 Not Found
	header($headerMsg);

	// example: etag: E354-...
	if($serverEtag) {
		header("etag: ".$serverEtag);
	}

	// example: last-modified: Fri, 13 Dec 2019 09:10:23 GMT
	if($serverLastModified !== 1) {
		header("last-modified: ".gmdate("D, d M Y H:i:s T", $serverLastModified));
	}

	if ($status !== 304) {

		// add items to the json array
		$json['title'] = "The anatomy of your request";

		$json['response'] = array( "statuscode" => $status, "message" => $headerMsg );

		// add select $_SERVER variables (we don't want to include sensitive server info to the public!)
		$json['server'] = array( 
			"PHP_SELF" => getServer("PHP_SELF"),
			"SCRIPT_NAME" => getServer("SCRIPT_NAME"),
			"SCRIPT_URI" => getServer("SCRIPT_URI"),
			"SCRIPT_URL" => getServer("SCRIPT_URL"),
			"REQUEST_URI" => getServer("REQUEST_URI"),
			"QUERY_STRING" => getServer("QUERY_STRING"),
			"REQUEST_METHOD" => getServer("REQUEST_METHOD"),
			"SERVER_PROTOCOL" => getServer("SERVER_PROTOCOL"),
			"REMOTE_PORT" => getServer("REMOTE_PORT"),
			"REMOTE_ADDR" => getServer("REMOTE_ADDR"),
			"REQUEST_SCHEME" => getServer("REQUEST_SCHEME"),
			"SERVER_PORT" => getServer("SERVER_PORT"),
			"SERVER_ADDR" => getServer("SERVER_ADDR"),
			"SERVER_NAME" => getServer("SERVER_NAME"),
			"HTTP_ACCEPT_ENCODING" => getServer("HTTP_ACCEPT_ENCODING"),
			"HTTP_ACCEPT_LANGUAGE" => getServer("HTTP_ACCEPT_LANGUAGE"),
			"HTTP_ACCEPT" => getServer("HTTP_ACCEPT"),
			"HTTP_USER_AGENT" => getServer("HTTP_USER_AGENT"),
			"HTTP_HOST" => getServer("HTTP_HOST"),
			"HTTP_REFERER" => getServer("HTTP_REFERER"),
			"HTTP_ORIGIN" => getServer("HTTP_ORIGIN"),
			"SSL_TLS_SNI" => getServer("SSL_TLS_SNI"),
			"HTTPS" => getServer("HTTPS"),
			"UNIQUE_ID" => getServer("UNIQUE_ID")
		);
		$json['request'] = $_REQUEST;
	} else {
		$json = null;
	}


	return $json;
*/
};