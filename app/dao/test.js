const tools = require("../utils/tools.js");

const testData = {};

testData.employees = [
    {
        name: "John Doe",
        id: "100000001",
        department: "Engineering",
        city: "Austin",
        salary: 150000
    },
    {
        name: "Jane Doe",
        id: "100000002",
        department: "Engineering",
        city: "San Diego",
        salary: 200000
    },
    {
        name: "Jackie Groverton",
        id: "100000003",
        department: "Accounting",
        city: "Chicago",
        salary: 125000
    },
    {
        name: "Nelson Frisco",
        id: "100000004",
        department: "Development",
        city: "Denver",
        salary: 130000
    },
    {
        name: "Jamie McElroy",
        id: "100000005",
        department: "Development",
        city: "Washington",
        salary: 110000
    },
    {
        name: "Charley Bruntin",
        id: "100000006",
        department: "Sales",
        city: "Omaha",
        salary: 100000
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
    },
    {
        title: "I Think, Therefore I Am: A Collection of My Thoughts",
        author: "Chad Leigh Kluck",
        id: "1234567-003",
        isbn: "1000000003",
        year: "2001"
    }
];

const getEmployeeById = function (id) {
    function isEmployee(employee) {
        return employee.id === id;
    };

    return testData.employees.find(isEmployee);
};

const getBookById = function (id) {
    function isBook(book) {
        return book.id === id;
    };

    return testData.books.find(isBook);
};

const getBookByISBN = function (isbn) {
    function isBook(book) {
        return book.isbn === isbn;
    };

    return testData.books.find(isBook);
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
            } else {
                data = testData;
            }

            response.body = data;

            resolve( response );

        } catch (error) {
			console.log(error);
			response.body = { status: 500, message: 'error', app: 'test' }
			response.statusCode = 500;
			reject( response );
        };
    });

};

module.exports = {
    getEmployeeById,
	get
};