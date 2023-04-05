const { tools } = require('@chadkluck/cache-data');

const games = {
	"gamechoices": [
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
	],
	"hiddengames": [
		"Tic-Tac-Toe"
	]
};

/**
 * A greeting catchphrase
 */
const greeting = 'Would you like to play a game?';

/**
 * 
 * @returns {string} a game randomly picked from the list
 */
const random = function () {
	const rand = Math.floor(Math.random() * list().length);
	return list()[rand];
};

/**
 * 
 * @returns {array<string>} An array of games
 */
const list = function () {
	return games.gamechoices;	
};

/**
 * 
 * @returns {object} All games
 */
const all = function () {
	return games;
};


/**
 * Calls the games dao
 * @param {string} code the command to execute
 * @returns {Response} requested game data
 */
const get = async (code = null) => {

	return new Promise(async (resolve, reject) => {

		let body = null;

		try {

			code = (code === null) ? 'all' : code.toLowerCase();

			switch (code) {
				case 'greeting':
					body = { greeting: greeting };
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

			resolve( body );
			
		} catch (error) {
			tools.DebugAndLog.error("games error", error);
			reject( { msg: "error" } );
		};

	});

};

module.exports = {
	greeting,
	random,
	list,
	all,
	get
};