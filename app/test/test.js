
const { root, ball, eluna, umwug, games, weather, test } = require('../dao/index.js');

const chai = require("chai")
const expect = chai.expect

// https://www.sitepoint.com/delay-sleep-pause-wait/
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
};

// https://stackoverflow.com/questions/9609393/catching-console-log-in-node-js
function hook_stream (_stream, fn) {
	// Reference default write method
	var old_write = _stream.write;
	// _stream now write with our shiny function
	_stream.write = fn;

	return function() {
		// reset to the default write method
		_stream.write = old_write;
	};
};

/* ****************************************************************************
 *	Root
 */


 describe("Root", () => {

	describe('List', () => {

		it('Passed Variables', async () => {
			const getList = (await root.get({requestContext: { domainName: 'www.example.com', path: '/asdf/'}})).body;

			expect((typeof getList)).to.equal('object')
			expect('greeting' in getList).to.be.true
			expect('available_endpoints' in getList).to.be.true
			expect(getList.available_endpoints[0].examples[0]).to.equal('https://www.example.com/asdf/games')
		})

	})

});

/* ****************************************************************************
 *	8 Ball
 */


describe("8 Ball", () => {

	describe('List', () => {

		it('getList is a list', async () => {
			const getList = (await ball.get('list')).body;

			expect((typeof getList)).to.equal('object')
			&& expect('list' in getList).to.be.true
			&& expect(Array.isArray(getList.list)).to.be.true
			&& expect(getList.list.length).to.equal(20)
			&& expect(getList.list[0]).to.equal("It is certain")
		})
		it('list is a list', () => {
			const list = ball.list();

			expect((typeof list)).to.equal('object')
			&& expect('list' in list).to.be.true
			&& expect(Array.isArray(list.list)).to.be.true
			&& expect(list.list.length).to.equal(20)
			&& expect(list.list[0]).to.equal("It is certain")
		})

	})

	describe('Prediction', () => {

		it('getPrediction is an object with a string', async () => {
			const getPrediction = (await ball.get('prediction')).body;
			const list = (await ball.get('list')).body.list;

			expect(typeof getPrediction).to.equal('object')
			&& expect('prediction' in getPrediction).to.be.true
			&& expect(typeof getPrediction.prediction).to.equal('string')
			&& expect(list.includes(getPrediction.prediction)).to.be.true
		})
		it('prediction is an object with a string', () =>  {
			const prediction = ball.prediction();
			const list = ball.list().list;

			expect(typeof prediction).to.equal('object')
			&& expect('prediction' in prediction).to.be.true
			&& expect(typeof prediction.prediction).to.equal('string')
			&& expect(list.includes(prediction.prediction)).to.be.true
		})

	})

	describe('Certainty', () => {

		it('getCertainty is an object with a number', async () => {
			const obj = (await ball.get('certainty')).body;
			const key = 'certainty';

			expect(typeof obj).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(typeof obj[key]).to.equal('number')
			&& expect(obj[key]).to.be.lessThanOrEqual(1)
		})
		it('certainty is an object with a number', () =>  {
			const obj = ball.certainty();
			const key = 'certainty';

			expect(typeof obj).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(typeof obj[key]).to.equal('number')
			&& expect(obj[key]).to.be.lessThanOrEqual(1)
		})

	})

	describe('Lucky Numbers', () => {

		it('getLuckyNumbers is an object with an array of 6 unique numbers', async () => {
			const obj = (await ball.get('luckynumbers')).body;
			const key = 'lucky_numbers';

			expect((typeof obj)).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(Array.isArray(obj[key])).to.be.true
			&& expect(obj[key].length).to.equal(6)
			&& expect(typeof obj[key][0]).to.equal("number")
			&& expect([...new Set(obj[key])].length).to.equal(6)
		})
		it('luckyNumbers is an object with an array of 6 unique numbers', () => {
			const obj = ball.luckyNumbers();
			const key = 'lucky_numbers';

			expect((typeof obj)).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(Array.isArray(obj[key])).to.be.true
			&& expect(obj[key].length).to.equal(6)
			&& expect(typeof obj[key][0]).to.equal("number")
			&& expect([...new Set(obj[key])].length).to.equal(6)
		})

	})

	describe('Data', () => {

		it('getData is an object with a prediction, lucky numbers, and certainty', async () => {
			const obj = (await ball.get('data')).body;

			expect((typeof obj)).to.equal('object')
			&& expect('prediction' in obj).to.be.true
			&& expect('lucky_numbers' in obj).to.be.true
			&& expect('certainty' in obj).to.be.true
			&& expect(typeof obj.prediction).to.equal("string")
			&& expect(Array.isArray(obj.lucky_numbers)).to.be.true
			&& expect(typeof obj.lucky_numbers[0]).to.equal("number")
			&& expect(obj.lucky_numbers.length).to.equal(6)
			&& expect(typeof obj.certainty).to.equal("number")
			&& expect(obj.certainty).to.be.lessThanOrEqual(1)
		})

		it('getData is default', async () => {
			const obj = (await ball.get()).body;

			expect((typeof obj)).to.equal('object')
			&& expect('prediction' in obj).to.be.true
			&& expect('lucky_numbers' in obj).to.be.true
			&& expect('certainty' in obj).to.be.true
			&& expect(typeof obj.prediction).to.equal("string")
			&& expect(Array.isArray(obj.lucky_numbers)).to.be.true
			&& expect(typeof obj.lucky_numbers[0]).to.equal("number")
			&& expect(obj.lucky_numbers.length).to.equal(6)
			&& expect(typeof obj.certainty).to.equal("number")
			&& expect(obj.certainty).to.be.lessThanOrEqual(1)
		})

	})

});

/* ****************************************************************************
 *	ELUNA
 */


 describe("ELUNA", () => {

	it('Default Greeting', async () => {
		const obj = (await eluna.get()).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(1)
		&& expect(obj[0]).to.equal('Hello, ELUNA!')
	})
	it('BAO is an array of three items', async () => {
		const obj = (await eluna.get('BAO')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(3)
		&& expect(obj[0]).to.equal('banana')
		&& expect(obj[1]).to.equal('apples')
		&& expect(obj[2]).to.equal('oranges')
	})
	it('CBL is an array of two items with Charlie and Linus', async () => {
		const obj = (await eluna.get('CBL')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(2)
		&& expect(obj[0]['name']).to.equal('Charlie Brown')
		&& expect(obj[1]['name']).to.equal('Linus van Pelt')
	})
	it('LVP is an object with data', async () => {
		const obj = (await eluna.get('LVP')).body;

		expect(typeof obj).to.equal('object')
		&& expect(obj.name).to.equal('Linus van Pelt')
		&& expect(Array.isArray(obj.loans)).to.be.true
		&& expect(obj.loans.length).to.equal(2)
	})
	it('CPE is an object with games', async () => {
		const obj = (await eluna.get('CPE')).body;

		expect(typeof obj).to.equal('object')
		&& expect('gamechoices' in obj).to.be.true
		&& expect(Array.isArray(obj.gamechoices)).to.be.true
		&& expect(obj.gamechoices.length).to.equal(15)
		&& expect(obj.gamechoices[1]).to.equal("Black Jack")
		&& expect(obj.gamechoices[14]).to.equal("Global Thermonuclear War")
		&& expect(obj.hiddengames.length).to.equal(1)
		&& expect(obj.hiddengames[0]).to.equal("Tic-Tac-Toe")
	})
	it('DEV is an array with 1 item', async () => {
		const obj = (await eluna.get('DEV')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(1)
		&& expect(obj[0]).to.equal("https://developers.exlibrisgroup.com")
	})
	it('DOC is an array with 1 item', async () => {
		const obj = (await eluna.get('DOC')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(1)
		&& expect(obj[0]).to.equal("https://developers.exlibrisgroup.com/alma/apis/users")
	})
	it('LNF is an array with 3 items', async () => {
		const obj = (await eluna.get('lhf')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(3)
		&& expect(obj[0]).to.contain("https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/loans?")
		&& expect(obj[1]).to.contain("https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/requests?")
		&& expect(obj[2]).to.contain("https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/fees?")
	})
	it('GIT is an array with 5 items', async () => {
		const obj = (await eluna.get('git')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(5)
		&& expect(obj[0]).to.contain("https://github.com/ustlibraries")
		&& expect(obj[1]).to.contain("https://github.com/chadkluck")
		&& expect(obj[2]).to.contain("https://github.com/chadkluck/serverless-sam-8ball-example")
	})
	it('BNS is an array with 5 items', async () => {
		const obj = (await eluna.get('bns')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(5)
		&& expect(obj[0]).to.contain("pnxs?q={{query}}")
		&& expect(obj[1]).to.contain("bibs/?view=full&expand=p_avail,e_avail")
		&& expect(obj[2]).to.contain("bibs/{{mms_id}}/holdings?format=")
	})
	it('8BL is an object with a string', async () =>  {
		const obj = (await eluna.get('8BL')).body;
		const list = ball.list().list;

		expect(typeof obj).to.equal('object')
		&& expect('prediction' in obj).to.be.true
		&& expect(typeof obj.prediction).to.equal('string')
		&& expect(list.includes(obj.prediction)).to.be.true
	})

});

/* ****************************************************************************
 *	GAMES
 */

 describe("Games", () => {

	describe("Greeting", () => {

		it('getGreeting is an object with a string', async () => {
			const obj = (await games.get('greeting')).body;
			const key = 'greeting';

			expect(typeof obj).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(obj[key]).to.equal('Would you like to play a game?')
		})
		it('greeting is an object with a string', () => {
			const obj = games.greeting();
			const key = 'greeting';

			expect(typeof obj).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(obj[key]).to.equal('Would you like to play a game?')
		})

	});

	describe("Name", () => {

		it('getName is an object with a string', async () => {
			const obj = (await games.get('name')).body;
			const key = 'name';

			expect(typeof obj).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(obj[key]).to.equal('Joshua')
		})
		it('name is an object with a string', () => {
			const obj = games.name();
			const key = 'name';

			expect(typeof obj).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(obj[key]).to.equal('Joshua')
		})
		
	});

	describe("Random Game", () => {

		it('getGame is an object with a string that exists in the gamechoices list', async () => {
			const obj = (await games.get('random')).body;
			const key = 'game';
			const list = games.list().gamechoices;

			expect(typeof obj).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(typeof obj[key]).to.equal('string')
			&& expect(list.includes(obj[key])).to.be.true
		})
		it('game is an object with a string that exists in the gamechoices list', () => {
			const obj = games.random();
			const key = 'game';
			const list = games.list().gamechoices;

			expect(typeof obj).to.equal('object')
			&& expect(key in obj).to.be.true
			&& expect(typeof obj[key]).to.equal('string')
			&& expect(list.includes(obj[key])).to.be.true
		})
		
	});

	describe("List", () => {

		it('getList is an object with an array of games', async () => {
			const obj = (await games.get('list')).body;

			expect(typeof obj).to.equal('object')
			&& expect('gamechoices' in obj).to.be.true
			&& expect(Array.isArray(obj.gamechoices)).to.be.true
			&& expect(obj.gamechoices.length).to.equal(15)
			&& expect(obj.gamechoices[1]).to.equal("Black Jack")
			&& expect(obj.gamechoices[14]).to.equal("Global Thermonuclear War")
		})
		it('list is an object with an array of games', () => {
			const obj = games.list();

			expect(typeof obj).to.equal('object')
			&& expect('gamechoices' in obj).to.be.true
			&& expect(Array.isArray(obj.gamechoices)).to.be.true
			&& expect(obj.gamechoices.length).to.equal(15)
			&& expect(obj.gamechoices[1]).to.equal("Black Jack")
			&& expect(obj.gamechoices[14]).to.equal("Global Thermonuclear War")
		})
		
	});

	describe("All", () => {

		it('getAll is an object with gamechoices and hiddengames', async () => {
			const obj = (await games.get()).body;

			expect(typeof obj).to.equal('object')
			&& expect('gamechoices' in obj).to.be.true
			&& expect(Array.isArray(obj.gamechoices)).to.be.true
			&& expect(obj.gamechoices.length).to.equal(15)
			&& expect(obj.gamechoices[1]).to.equal("Black Jack")
			&& expect(obj.gamechoices[14]).to.equal("Global Thermonuclear War")
			&& expect(obj.hiddengames.length).to.equal(1)
			&& expect(obj.hiddengames[0]).to.equal("Tic-Tac-Toe")
		})

		it('All is an object with gamechoices and hiddengames', () => {
			const obj = games.all();

			expect(typeof obj).to.equal('object')
			&& expect('gamechoices' in obj).to.be.true
			&& expect(Array.isArray(obj.gamechoices)).to.be.true
			&& expect(obj.gamechoices.length).to.equal(15)
			&& expect(obj.gamechoices[1]).to.equal("Black Jack")
			&& expect(obj.gamechoices[14]).to.equal("Global Thermonuclear War")
			&& expect(obj.hiddengames.length).to.equal(1)
			&& expect(obj.hiddengames[0]).to.equal("Tic-Tac-Toe")
		})

	})

 });


/* ****************************************************************************
 *	UMWUG
 */


 describe("UMWUG", () => {

	it('Default Greeting', async () => {
		const obj = (await umwug.get()).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(1)
		&& expect(obj[0]).to.equal('Hello, UMWUG!')
	})
	it('BAO is an array of three items', async () => {
		const obj = (await umwug.get('BAO')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(3)
		&& expect(obj[0]).to.equal('banana')
		&& expect(obj[1]).to.equal('apples')
		&& expect(obj[2]).to.equal('oranges')
	})
	it('CBL is an array of two items with Charlie and Linus', async () => {
		const obj = (await umwug.get('CBL')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(2)
		&& expect(obj[0]['name']).to.equal('Charlie Brown')
		&& expect(obj[1]['name']).to.equal('Linus van Pelt')
	})
	it('LVP is an object with data', async () => {
		const obj = (await umwug.get('LVP')).body;

		expect(typeof obj).to.equal('object')
		&& expect(obj.name).to.equal('Linus van Pelt')
		&& expect(Array.isArray(obj.loans)).to.be.true
		&& expect(obj.loans.length).to.equal(2)
	})
	it('CPE is an object with games', async () => {
		const obj = (await umwug.get('CPE')).body;

		expect(typeof obj).to.equal('object')
		&& expect('gamechoices' in obj).to.be.true
		&& expect(Array.isArray(obj.gamechoices)).to.be.true
		&& expect(obj.gamechoices.length).to.equal(15)
		&& expect(obj.gamechoices[1]).to.equal("Black Jack")
		&& expect(obj.gamechoices[14]).to.equal("Global Thermonuclear War")
		&& expect(obj.hiddengames.length).to.equal(1)
		&& expect(obj.hiddengames[0]).to.equal("Tic-Tac-Toe")
	})
	it('DEV is an array with 1 item', async () => {
		const obj = (await umwug.get('DEV')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(1)
		&& expect(obj[0]).to.equal("https://developers.exlibrisgroup.com")
	})
	it('DOC is an array with 1 item', async () => {
		const obj = (await umwug.get('DOC')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(1)
		&& expect(obj[0]).to.equal("https://developers.exlibrisgroup.com/alma/apis/users")
	})
	it('LNF is an array with 3 items', async () => {
		const obj = (await umwug.get('lhf')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(3)
		&& expect(obj[0]).to.contain("https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/loans?")
		&& expect(obj[1]).to.contain("https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/requests?")
		&& expect(obj[2]).to.contain("https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/fees?")
	})
	it('GIT is an array with 5 items', async () => {
		const obj = (await umwug.get('git')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(5)
		&& expect(obj[0]).to.contain("https://github.com/ustlibraries")
		&& expect(obj[1]).to.contain("https://github.com/chadkluck")
		&& expect(obj[2]).to.contain("https://github.com/chadkluck/serverless-sam-8ball-example")
	})
	it('BNS is an array with 5 items', async () => {
		const obj = (await umwug.get('bns')).body;

		expect(Array.isArray(obj)).to.be.true
		&& expect(obj.length).to.equal(5)
		&& expect(obj[0]).to.contain("pnxs?q={{query}}")
		&& expect(obj[1]).to.contain("bibs/?view=full&expand=p_avail,e_avail")
		&& expect(obj[2]).to.contain("bibs/{{mms_id}}/holdings?format=")
	})

});