const data = {};

data.employees = [
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

const getEmployeeById = function (id) {
    function isEmployee(employee) {
        return employee.id === id;
    };

    data.employees.find(isEmployee);
}

const get = function(event) {

    let data = null;
    
    let eventParameters = lowerCaseKeys(event.queryStringParameters);

    if ("id" in eventParameters) {
        data = getEmployeeById(eventParameters.id);
    };

    return data;

};

module.exports = {
    getEmployeeById,
	get
};