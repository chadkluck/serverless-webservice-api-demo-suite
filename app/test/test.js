
const { ball, eluna, umwug, games, weather, test } = require('../dao/index.js');

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
 *	8 Ball
 */


describe("8 Ball", () => {

	describe('List', () => {

		it('getList is a list', async () => {
			const getList = await ball.get('list');

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
			const getPrediction = await ball.get('prediction');
			const list = (await ball.get('list')).list;

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
			const obj = await ball.get('certainty');
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
			const obj = await ball.get('luckynumbers');
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
			const obj = await ball.get('data');

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