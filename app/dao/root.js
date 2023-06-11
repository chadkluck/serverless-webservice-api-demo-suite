const data = {
	greeting: 'Welcome to the 63K-Labs API Test Suite by Chad Leigh Kluck',
	github: 'https://github.com/chadkluck/serverless-webservice-api-demo-suite',
	description: 'A suite of apis that can be used as examples and for testing. Visit the GitHub repository link to learn more about each',
	available_endpoints: [
		{
			name: 'Games',
			description: '',
			methods: ['GET'],
			endpoint: '{{domain}}',
			path: '{{path}}/games',
			examples: [
				'https://{{domain}}{{path}}/games',
				'https://{{domain}}{{path}}/games?code=greeting',
				'https://{{domain}}{{path}}/games?code=name',
				'https://{{domain}}{{path}}/games?code=random',
				'https://{{domain}}{{path}}/games?code=list',
				'https://{{domain}}{{path}}/games?code=all'
			]
		},
		{
			name: '8 Ball',
			description: '',
			methods: ['GET'],
			domain: '{{domain}}',
			path: '{{path}}/8ball',
			examples: [
				'https://{{domain}}{{path}}/8ball',
				'https://{{domain}}{{path}}/8ball?code=prediction',
				'https://{{domain}}{{path}}/8ball?code=luckynumbers',
				'https://{{domain}}{{path}}/8ball?code=certainty',
				'https://{{domain}}{{path}}/8ball?code=list'
			]
		},
		{
			name: 'ELUNA',
			description: '',
			methods: ['GET'],
			domain: '{{domain}}',
			path: '{{path}}/eluna',
			examples: [
				'https://{{domain}}{{path}}/eluna',
				'https://{{domain}}{{path}}/eluna?code=bao',
				'https://{{domain}}{{path}}/eluna?code=cbl',
				'https://{{domain}}{{path}}/eluna?code=lvp',
				'https://{{domain}}{{path}}/eluna?code=cpe',
				'https://{{domain}}{{path}}/eluna?code=dev',
				'https://{{domain}}{{path}}/eluna?code=doc',
				'https://{{domain}}{{path}}/eluna?code=lhf',
				'https://{{domain}}{{path}}/eluna?code=cpe',
				'https://{{domain}}{{path}}/eluna?code=git',
				'https://{{domain}}{{path}}/eluna?code=bns',
				'https://{{domain}}{{path}}/eluna?code=8bl'
			]
		},
		{
			name: 'UMWUG',
			description: '',
			methods: ['GET'],
			domain: '{{domain}}',
			path: '{{path}}/umwug',
			examples: [
				'https://{{domain}}{{path}}/umwug',
				'https://{{domain}}{{path}}/umwug?code=bao',
				'https://{{domain}}{{path}}/umwug?code=cbl',
				'https://{{domain}}{{path}}/umwug?code=lvp',
				'https://{{domain}}{{path}}/umwug?code=cpe',
				'https://{{domain}}{{path}}/umwug?code=dev',
				'https://{{domain}}{{path}}/umwug?code=doc',
				'https://{{domain}}{{path}}/umwug?code=lhf',
				'https://{{domain}}{{path}}/umwug?code=cpe',
				'https://{{domain}}{{path}}/umwug?code=git',
				'https://{{domain}}{{path}}/umwug?code=bns'
			]
		},
		{
			name: 'Weather',
			description: '',
			methods: ['GET'],
			domain: '{{domain}}',
			path: '{{path}}/weather',
			examples: [
				'https://{{domain}}{{path}}/weather'
			]
		},
		{
			name: 'Test',
			description: '',
			methods: ['GET'],
			domain: '{{domain}}',
			path: '{{path}}/test',
			examples: [
				'https://{{domain}}{{path}}/test',
				'https://{{domain}}{{path}}/test?data=books',
				'https://{{domain}}{{path}}/test?data=books&id=1234567-001',
				'https://{{domain}}{{path}}/test?data=books&isbn=1000000002',
				'https://{{domain}}{{path}}/test?data=employees',
				'https://{{domain}}{{path}}/test?data=employees&id=100000005'
			]
		},
		{
			name: 'Echo',
			description: '',
			methods: ['GET', 'POST'],
			domain: '{{domain}}',
			path: '{{path}}/echo',
			examples: [
				'https://{{domain}}{{path}}/echo',
				'https://{{domain}}{{path}}/echo?status=301',
				'https://{{domain}}{{path}}/echo?status=302',
				'https://{{domain}}{{path}}/echo?status=404',
				'https://{{domain}}{{path}}/echo?status=418',
				'https://{{domain}}{{path}}/echo?status=500',
				"curl --request GET --location 'https://{{domain}}{{path}}/echo/?etag=ef4a8cde' --header 'If-None-Match: ef4a8cde'",
				"curl --request GET --location 'https://{{domain}}{{path}}/echo?etag=123fd9ced' --header 'If-None-Match: ef4a8cde'",
				"curl --request GET --location ''https://{{domain}}{{path}}/echo/?lastmodified=2023-04-27' --header 'If-Modified-Since: Thu, 27 Apr 2023 01:07:01 GMT'",
				"curl --request GET --location ''https://{{domain}}{{path}}/echo/?lastmodified=2023-04-28' --header 'If-Modified-Since: Thu, 27 Apr 2023 01:07:01 GMT'",
				`curl --request POST --location 'https://{{domain}}{{path}}/echo' --header 'Content-Type: application/json' --data '{"name": "Body POST Test"}'`,
				`curl --request POST --location 'https://{{domain}}{{path}}/echo?body=false' --header 'Content-Type: application/json' --data '{"name": "Body POST Test"}'`
			]
		}
	]
};

const get = async (event) => {

	return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'content-type': 'application/json'}};

        try {
			const domain = event.requestContext.domainName;
			const path = '/' + event.requestContext.path.replace(/^\/|\/$/g, '');

			const domainRegEx = new RegExp('{{domain}}', 'gi');
			const pathRegEx = new RegExp('{{path}}', 'gi');

			response.body = JSON.parse((JSON.stringify(data)).replace(domainRegEx, domain).replace(pathRegEx, path));

            resolve( response );
                
        } catch (error) {
			response.body = { app: 'root', message: 'error' }
			response.statusCode = 500;
			reject( response );
        };

    });

};

module.exports = {
	get
};