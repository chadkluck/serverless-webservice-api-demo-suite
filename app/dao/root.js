const data = {
	greeting: 'Welcome to the 63K-Labs API Test Suite by Chad Leigh Kluck',
	github: '',
	description: 'A suite of apis that can be used as examples and for testing. Visit the GitHub repository link to learn more about each',
	available_endpoints: [
		{
			name: 'Games',
			description: '',
			method: 'GET',
			endpoint: '{{domain}}',
			path: '{{path}}/games',
			examples: [
				'https://{{domain}}/{{path}}/games',
				'https://{{domain}}/{{path}}/games?code=greeting',
				'https://{{domain}}/{{path}}/games?code=name',
				'https://{{domain}}/{{path}}/games?code=random',
				'https://{{domain}}/{{path}}/games?code=list',
				'https://{{domain}}/{{path}}/games?code=all'
			]
		},
		{
			name: '8 Ball',
			description: '',
			method: 'GET',
			domain: '{{domain}}',
			path: '{{path}}/ball',
			examples: [
				'https://{{domain}}/{{path}}/ball',
				'https://{{domain}}/{{path}}/ball?code=prediction',
				'https://{{domain}}/{{path}}/ball?code=luckynumbers',
				'https://{{domain}}/{{path}}/ball?code=certainty',
				'https://{{domain}}/{{path}}/ball?code=list'
			]
		},
		{
			name: 'ELUNA',
			description: '',
			method: 'GET',
			domain: '{{domain}}',
			path: '{{path}}/eluna'
		},
		{
			name: 'UMWUG',
			description: '',
			method: 'GET',
			domain: '{{domain}}',
			path: '{{path}}/umwug'
		},
		{
			name: 'Weather',
			description: '',
			method: 'GET',
			domain: '{{domain}}',
			path: '{{path}}/weather'
		},
		{
			name: 'Test',
			description: '',
			method: 'GET',
			domain: '{{domain}}',
			path: '{{path}}/test'
		},
		{
			name: 'Echo',
			description: '',
			method: 'GET',
			domain: '{{domain}}',
			path: '{{path}}/echo'
		}
	]
};

const get = async (event) => {

	return new Promise(async (resolve, reject) => {

        try {
			const domain = event.requestContext.domainName;
			const path = event.requestContext.path;

			let body = JSON.parse((JSON.stringify(body)).replaceAll('{{domain}}', domain).replaceAll('{{path}}', path));
            resolve( body );
                
        } catch (error) {
            reject( { msg: "error" } );
        };

    });

};

module.exports = {
	get
};