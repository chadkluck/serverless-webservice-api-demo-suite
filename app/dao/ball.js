/**
 * Possible prediction answers
 */
const answers = [ 
	"It is certain",
	"It is decidedly so",
	"Without a doubt",
	"Yes definitely",
	"You may rely on it",
	"As I see it, yes",
	"Most likely",
	"Outlook good",
	"Yes",
	"Signs point to yes",
	"Reply hazy try again",
	"Ask again later",
	"Better not tell you now",
	"Cannot predict now",
	"Concentrate and ask again",
	"Don't count on it",
	"My reply is no",
	"My sources say no",
	"Outlook not so good",
	"Very doubtful"
];

/**
 * 
 * @returns {{list: array<string>}} An object containing an array of possible responses
 */
const list = function () {
	return { list: answers };
};

/**
 * @returns {{prediction: string, lucky_numbers: array<number>, certainty: number}} An object with predictions made by the all powerful, all knowing oracle along with its level of certainty
 */
const data = function () {
	return { 
		...prediction(),
		...luckyNumbers(),
		...certainty()
	};
};

/**
 * @returns {{prediction: string}} A prediction from the all powerful, all knowing, oracle.
 */
const prediction = function () {
	const rand = Math.floor(Math.random() * answers.length);
	return { prediction: answers[rand]};
};

/**
 * 
 * @returns {{lucky_numbers: Array<number>}} An array of 7 lucky numbers
 */
const luckyNumbers = function () {
	let numbers = [];
	for (let i = 0; i < 6; i++) {
		let luckyNumber = 0;
		do { // make sure all numbers in array are unique
			luckyNumber = Math.floor(Math.random() * 98 ) + 1; // random number between 1 and 99
		} while (numbers.includes(luckyNumber))
		numbers[i] = luckyNumber;
	}
	return { lucky_numbers: numbers };
};

/**
 * 
 * @returns {{certainty: number}} A level of certainty for the prediction
 */
const certainty = function () {
	return { certainty: Math.random() };
};


/**
 * Gets ball data (async)
 * If code is null, empty, or invalid, an object containing a prediction, lucky numbers, and certainty is returned
 * @param {string} code
 * @returns {object} An 8 Ball object based on code
 */
const get = async (code = null) => {

	return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'content-type': 'application/json'}};

		try {

			let body = null;

			code = (code === null || code === '' || typeof code !== 'string') ? 'data' : code.toLowerCase();

			switch (code) {
				case 'list':
					body = list();
					break;
				case 'prediction':
					body = prediction();
					break;
				case 'luckynumbers':
					body = luckyNumbers();
					break;
				case 'certainty':
					body = certainty();
					break;
				default:
					body = data();
					break;
			}

			response.body = body;

			resolve( response );
			
		}  catch (error) {
			console.log(error);
			response.body = { status: 500, message: 'error', app: 'ball' }
			response.statusCode = 500;
			reject( response );
        };

	});

};

module.exports = {
	list,
	data,
	prediction,
	luckyNumbers,
	certainty,
	get
};