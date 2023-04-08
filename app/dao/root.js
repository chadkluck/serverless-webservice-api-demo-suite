const body = {
	greeting: 'Welcome to the 63K-Labs API Test Suite by Chad Leigh Kluck',
	github: '',
	description: 'A suite of apis that can be used as examples and for testing. Visit the GitHub repository link to learn more about each',
	available_endpoints: [
		{
			name: 'Games',
			description: '',
			method: 'GET',
			domain: '{{domain}}',
			path: '{{path}}/games'
		},
		{
			name: '8 Ball',
			description: '',
			method: 'GET',
			domain: '{{domain}}',
			path: '{{path}}/ball'
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

const get = async () => {

	return new Promise(async (resolve, reject) => {

        try {

            resolve( body );
                
        } catch (error) {
            reject( { msg: "error" } );
        };

    });

};

module.exports = {
	get
};