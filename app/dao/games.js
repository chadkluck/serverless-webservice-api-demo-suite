
const gamechoices = [
	"Falken's Maze",
	"Black Jack",
	"Gin Rummy",
	"Hearts",
	"Bridge",
	"Checkers",
	"Chess",
	"Poker",
	"Fighter Combat",
	"Guerrilla Engagement",
	"Desert Warfare",
	"Air-To-Ground Actions",
	"Theaterwide Tactical Warfare",
	"Theaterwide Biotoxic and Chemical Warfare",
	"Global Thermonuclear War"
];

const hiddengames = [ "Tic-Tac-Toe" ];

/**
 * 
 * @returns {{greeting: string}} A greeting string
 */
const greeting = function () {
	return { greeting: 'Would you like to play a game?'};
};

/**
 * 
 * @returns {{name: string}} A name
 */
const name = function () {
	return { name: 'Joshua' };
};

/**
 * 
 * @returns {{game: string}} a game randomly picked from the list
 */
const random = function () {
	const rand = Math.floor(Math.random() * gamechoices.length);
	return { game: gamechoices[rand] };
};

/**
 * 
 * @returns {{gamechoices: array<string>}} An array of games
 */
const list = function () {
	return { gamechoices };
};

/**
 * 
 * @returns {{gamechoices: array<string>, hiddengames: array<string>}} All games
 */
const all = function () {
	return { gamechoices, hiddengames };
};

/**
 * async Get game data
 * @param {string} code the command to execute
 * @returns {object} requested game data
 */
const get = async (code = null) => {

	return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'content-type': 'application/json'}};

		try {

			let body = null;

			code = (code === null || code === '' || typeof code !== 'string') ? 'all' : code.toLowerCase();

			switch (code) {
				case 'greeting':
					body = greeting();
					break;
				case 'name':
					body = name();
					break;
				case 'random':
					body = random();
					break;
				case 'list':
					body = list();
					break;
				default:
					body = all();
					break;
			}

			response.body = body;

			resolve( response );
			
		} catch (error) {
			response.body = { app: 'ball', message: 'error' }
			response.statusCode = 500;
			reject( response );	
		};

	});

};

module.exports = {
	greeting,
	name,
	random,
	list,
	all,
	get
};