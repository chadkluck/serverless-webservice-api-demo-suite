
/**
 * Possible prediction answers
 */
const answers = [ "It is certain",
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
 * @returns {{prediction: String, lucky_numbers: array<number>, certainty: number}} An object with predictions made by the all powerful, all knowing oracle along with its level of certainty
 */
const data = function () {
	return { prediction: prediction(), lucky_numbers: luckyNumbers(), certainty: certainty() }
};

/**
 * @returns {string} A prediction from the all powerful, all knowing, oracle.
 */
const prediction = function () {
	const rand = Math.floor(Math.random() * answers.length);
	return answers[rand];
};

/**
 * 
 * @returns {Array<number>} An array of 7 lucky numbers
 */
const luckyNumbers = function () {
	let numbers = [];
	for (let i = 0; i < 8; i++) {
		numbers[i] = Math.floor(Math.random() * 99 );
	}
	return numbers;
};

/**
 * 
 * @returns {number} A level of certainty for the prediction
 */
const certainty = function () {
	return Math.random();
};