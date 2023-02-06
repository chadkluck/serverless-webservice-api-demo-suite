
const dataSet = {
    default: [ 'Hello, ELUNA!'],
    bao: ['banana', 'apples', 'oranges'],
    cbl: [
        {
            name: 'Charlie Brown',
            id: '1005783',
            fines: 38.93
        },
        {
            name: 'Linus van Pelt',
            id: '1004378',
            fines: 0,
            loans: [ {title: 'Bible (KJV)', due: '20181226'}, { title: 'Public Speaking', due: '20181226'} ]
        }
    ],
    lvp: {
        name: 'Linus van Pelt',
        id: '1004378',
        fines: 0,
        loans: [ {title: 'Bible (KJV)', due: '20181226'}, { title: 'Public Speaking', due: '20181226'} ]
    },
    cpe: {
        gamechoices: [
            "Falken's Maze",
            'Black Jack',
            'Gin Rummy',
            'Hearts',
            'Bridge',
            'Checkers',
            'Chess',
            'Poker',
            'Fighter Combat',
            'Guerrilla Engagement',
            'Desert Warfare',
            'Air-To-Ground Actions',
            'Theaterwide Tactical Warfare',
            'Theaterwide Biotoxic and Chemical Warfare',
            'Global Thermonuclear War'
        ],
        hiddengames: [
            'Tic-Tac-Toe'
        ]
    },
    dev: [ 'https://developers.exlibrisgroup.com' ],
    doc: [ 'https://developers.exlibrisgroup.com/alma/apis/users' ],
    lhf: [
        'https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/loans?user_id_type=all_unique&limit=10&offset=0&order_by=due_date&format=json&direction=ASC&apikey={{apikey}}',
	    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/requests?request_type=HOLD&user_id_type=all_unique&limit=10&offset=0&status=active&format=json&apikey={{apikey}}',
	    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/users/{{user_id}}/fees?user_id_type=all_unique&status=ACTIVE&format=json&apikey={{apikey}}'
    ],
    git: [
        'https://github.com/ustlibraries',
        'https://github.com/chadkluck',
        'https://github.com/chadkluck/serverless-sam-8ball-example',
        'https://github.com/chadkluck/php-project-framework',
        'https://github.com/chadkluck/js-template'
    ],
    bns: [
        'https://api-na.hosted.exlibrisgroup.com/primo/v1/pnxs?q={{query}}&lang=eng&offset=1&limit=10&view=full&vid=STTHOMAS&scope=stthomas&apikey={{apikey}}',
	    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/?view=full&expand=p_avail,e_avail,d_avail &nz_mms_id={{nz_mms_id}}&format={{format}}&apikey={{apikey}}',
	    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/{{mms_id}}/holdings?format={{format}}&apikey={{apikey}}',
	    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/{{mms_id}}/holdings/{{holding_id}}/items/?format={{format}}&apikey={{apikey}}',
	    'https://api-na.hosted.exlibrisgroup.com/almaws/v1/bibs/{{mms_id}}/holdings/{{holding_id}}/items/{{item_pid}}/requests?user_id={{user_id}}&format={{format}}&apikey={{apikey}}'
    ],
    '8bl': eight()
}

const getData = function (code) {
    let key = (code !== null && code !== '') ? code.toLowerCase() : 'default';
    key = ( (key in dataSet) ? key : 'default' );
	return dataSet[key];
};

const eight = function () {
    const answers = [ 'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', "Don't count on it", 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful' ];
    const rand = Math.floor(Math.random() * answers.length);
	return answers[rand];
};