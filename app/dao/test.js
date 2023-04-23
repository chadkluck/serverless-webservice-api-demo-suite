const tools = require("../utils/tools.js");

const testData = {};

testData.employees = [
    {
        name: "John Doe",
        id: "100000001",
        city: "Austin"
    },
    {
        name: "Jane Doe",
        id: "100000002",
        city: "San Diego"
    },
    {
        name: "Jackie Groverton",
        id: "100000003",
        city: "Chicago"
    },
    {
        name: "Nelson Frisco",
        id: "100000004",
        city: "Denver"
    },
    {
        name: "Jamie McElroy",
        id: "100000005",
        city: "Washington"
    },
    {
        name: "Charley Bruntin",
        id: "100000006",
        city: "Omaha"
    },
];

testData.books = [
    {
        title: "Hello, World",
        author: "Jane Doe",
        id: "1234567-001",
        isbn: "1000000001",
        year: "2019"
    },
    {
        title: "Golden Sun",
        author: "Jane Doe",
        id: "1234567-002",
        isbn: "1000000002",
        year: "2022"
    }
];

const getEmployeeById = function (id) {
    function isEmployee(employee) {
        return employee.id === id;
    };

    testData.employees.find(isEmployee);
};

const getBookById = function (id) {
    function isBook(book) {
        return book.id === id;
    };

    testData.books.find(isBook);
};

const getBookByISBN = function (isbn) {
    function isBook(book) {
        return book.isbn === isbn;
    };

    testData.books.find(isBook);
};

const get = async (event) => {

    return new Promise(async (resolve, reject) => {

		let response = {statusCode: 200, body: null, headers: {'Content-Type': 'application/json'}};

		try {
            let data = null;
            
            let eventParameters = tools.lowerCaseKeys(event.queryStringParameters);

            // Add your own logic for test data - it doesn't need to be clean - quick and dirty but stable gets the job done
            if ("data" in eventParameters) {
                switch (eventParameters.data) {
                    case "employees":
                        if ("id" in eventParameters) {
                            data = getEmployeeById(eventParameters.id);
                        } else {
                            data = testData.employees;
                        };                  
                        break;
                    case "books":
                        if ("id" in eventParameters) {
                            data = getBookById(eventParameters.id);
                        } else if ("isbn" in eventParameters) {
                            data = getBookByISBN(eventParameters.isbn);
                        } else {
                            data = testData.books;
                        }
                        break;
                    default:
                        data = testData;
                        break;
                }
            }

            response.body = data;

            resolve( response );

        } catch (error) {
            response.body = { app: 'test', message: 'error' }
			response.statusCode = 500;
            reject( response );
        }
    });

};

module.exports = {
    getEmployeeById,
	get
};