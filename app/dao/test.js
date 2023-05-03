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

testData.posts = [
    {
        title: "Hello, World",
        author: "Urs Barnes",
        id: "123001",
        date: "2019-01-01T00:00:00.000Z",
        content: "Hello, World!"
    },
    {
        title: "7 Things Every Programmer Should Know",
        author: "B. Chu",
        id: "123002",
        date: "2023-03-01T05:16:00.000Z",
        content: `<p>Lorum ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh nec elit gravida sodales. Sed sed nibh in elit ullamcorper feugiat. Sed nec nibh et justo luctus ultricies. Sed non nibh.</p>
        <p>Fusce vitae libero viverra, iaculis metus in, tincidunt orci. Integer sed placerat tellus. Sed mollis rhoncus velit in fringilla. Nunc pretium, nunc nec placerat volutpat, velit dui iaculis ex, eget tincidunt sapien velit a lacus. Curabitur consectetur arcu sit amet lectus dignissim ultricies. Phasellus eleifend pulvinar eleifend. Nulla consequat arcu ante, vel porttitor tortor lobortis commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Integer congue sem nec luctus porttitor. Donec euismod nec purus vitae condimentum. Morbi sed elementum sapien. Suspendisse quis imperdiet sem. Cras ullamcorper iaculis velit, in aliquam nisi convallis a. Nam quam ante, rhoncus in sapien eget, egestas ultricies ipsum. Donec in lorem orci. Vivamus at urna id erat bibendum commodo. Duis a sapien dictum, imperdiet quam ut, posuere urna. Etiam in leo leo. </p>
        <p>Nullam auctor, nunc non consectetur tristique, nisl nibh vulputate nunc, at ultricies nisi nunc a nibh. Nulla facilisi. Sed auctor, sem at aliquet vulputate.</p>
        <p>Nulla scelerisque sit amet enim sit amet egestas. Mauris pharetra dui nec semper ullamcorper. Maecenas congue scelerisque pharetra. Donec hendrerit fermentum luctus. Proin dignissim dolor sed tellus volutpat egestas. Aliquam semper feugiat justo eget egestas. Donec dignissim nunc at erat luctus dignissim.</p>
        <p>Integer a tortor vehicula neque consequat auctor vitae non ligula. Ut scelerisque tortor eget enim elementum volutpat. Donec tempor dolor odio, et pulvinar nisl maximus at. Sed tempus leo eros, vel egestas mi faucibus ac. Duis ut convallis mi, ac venenatis ante. Nunc urna quam, venenatis quis dolor vehicula, fermentum iaculis erat. Curabitur non sem nec lorem tempus ullamcorper sagittis a diam. Ut scelerisque enim vitae molestie bibendum. Nunc dictum, nisl eget eleifend accumsan, nibh nulla commodo est, vel feugiat tellus augue id ipsum. Vestibulum dignissim turpis sed tempor volutpat. Morbi laoreet, augue a blandit condimentum, mi tortor dapibus turpis, nec condimentum elit eros sit amet massa. Nunc efficitur urna ac tortor aliquet pretium. Cras ac tempus quam, eget facilisis justo. Aliquam ac vestibulum diam, vitae vehicula justo. Maecenas quis fermentum massa. Aliquam convallis metus lacus, nec tincidunt lorem rhoncus sed.</p>`
    },
    {
        title: "5 Ways You Are Coding Everything Wrong",
        author: "Charlotte  Terwilliger",
        id: "123003",
        date: "2023-03-05T23:10:00.000Z",
        content: `<p>Nulla scelerisque sit amet enim sit amet egestas. Mauris pharetra dui nec semper ullamcorper. Maecenas congue scelerisque pharetra. Donec hendrerit fermentum luctus. Proin dignissim dolor sed tellus volutpat egestas. Aliquam semper feugiat justo eget egestas. Donec dignissim nunc at erat luctus dignissim.</p>
        <p>Integer a tortor vehicula neque consequat auctor vitae non ligula. Ut scelerisque tortor eget enim elementum volutpat. Donec tempor dolor odio, et pulvinar nisl maximus at. Sed tempus leo eros, vel egestas mi faucibus ac. Duis ut convallis mi, ac venenatis ante. Nunc urna quam, venenatis quis dolor vehicula, fermentum iaculis erat. Curabitur non sem nec lorem tempus ullamcorper sagittis a diam. Ut scelerisque enim vitae molestie bibendum. Nunc dictum, nisl eget eleifend accumsan, nibh nulla commodo est, vel feugiat tellus augue id ipsum. Vestibulum dignissim turpis sed tempor volutpat. Morbi laoreet, augue a blandit condimentum, mi tortor dapibus turpis, nec condimentum elit eros sit amet massa. Nunc efficitur urna ac tortor aliquet pretium. Cras ac tempus quam, eget facilisis justo. Aliquam ac vestibulum diam, vitae vehicula justo. Maecenas quis fermentum massa. Aliquam convallis metus lacus, nec tincidunt lorem rhoncus sed.</p>
        <p>Fusce vitae libero viverra, iaculis metus in, tincidunt orci. Integer sed placerat tellus. Sed mollis rhoncus velit in fringilla. Nunc pretium, nunc nec placerat volutpat, velit dui iaculis ex, eget tincidunt sapien velit a lacus. Curabitur consectetur arcu sit amet lectus dignissim ultricies. Phasellus eleifend pulvinar eleifend. Nulla consequat arcu ante, vel porttitor tortor lobortis commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nullam auctor, nunc non consectetur tristique, nisl nibh vulputate nunc, at ultricies nisi nunc a nibh. Nulla facilisi. Sed auctor, sem at aliquet vulputate.</p>
        <p>Integer congue sem nec luctus porttitor. Donec euismod nec purus vitae condimentum. Morbi sed elementum sapien. Suspendisse quis imperdiet sem. Cras ullamcorper iaculis velit, in aliquam nisi convallis a. Nam quam ante, rhoncus in sapien eget, egestas ultricies ipsum. Donec in lorem orci. Vivamus at urna id erat bibendum commodo. Duis a sapien dictum, imperdiet quam ut, posuere urna. Etiam in leo leo. </p>
        <p>Lorum ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh nec elit gravida sodales. Sed sed nibh in elit ullamcorper feugiat. Sed nec nibh et justo luctus ultricies. Sed non nibh.</p>`
    },
    {
        title: "Hacking the Simulation",
        author: "Anderson",
        id: "123004",
        date: "2023-04-01T03:31:13.113Z",
        content: `<p>01111011001001110010101001001110011111001110001111011000000000010000110001110101101001100110100101110111011001110001000100010000001010111001011110001111101011010100000010001011111001001100000001101001000010101001011001011011101010011111111110011110101101001011110101011011101010000100111111011001000110001101001010101111110110111110000101110110100001110010100100111011110000111010110001100110110010100111011011111101101011110011010100111101011100001101011000110011001111101100100001011001101010101101</p>`
    },
    {
        title: "The Art of Computer Programming",
        author: "H. Smith",
        id: "123005",
        date: "2023-04-06T00:00:00.000Z",
        content: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh nec elit gravida sodales. Sed sed nibh in elit ullamcorper feugiat. Sed nec nibh et justo luctus ultricies. Sed non nibh.</p>`
    },
    {
        title: "Coding for GPS",
        author: "Gladys West",
        id: "123006",
        date: "2023-04-07T00:00:00.000Z",
        content: `<p>Nulla scelerisque sit amet enim sit amet egestas. Mauris pharetra dui nec semper ullamcorper. Maecenas congue scelerisque pharetra. Donec hendrerit fermentum luctus. Proin dignissim dolor sed tellus volutpat egestas. Aliquam semper feugiat justo eget egestas. Donec dignissim nunc at erat luctus dignissim.</p>
        <p>Integer a tortor vehicula neque consequat auctor vitae non ligula. Ut scelerisque tortor eget enim elementum volutpat. Donec tempor dolor odio, et pulvinar nisl maximus at. Sed tempus leo eros, vel egestas mi faucibus ac. Duis ut convallis mi, ac venenatis ante. Nunc urna quam, venenatis quis dolor vehicula, fermentum iaculis erat. Curabitur non sem nec lorem tempus ullamcorper sagittis a diam. Ut scelerisque enim vitae molestie bibendum. Nunc dictum, nisl eget eleifend accumsan, nibh nulla commodo est, vel feugiat tellus augue id ipsum. Vestibulum dignissim turpis sed tempor volutpat. Morbi laoreet, augue a blandit condimentum, mi tortor dapibus turpis, nec condimentum elit eros sit amet massa. Nunc efficitur urna ac tortor aliquet pretium. Cras ac tempus quam, eget facilisis justo. Aliquam ac vestibulum diam, vitae vehicula justo. Maecenas quis fermentum massa. Aliquam convallis metus lacus, nec tincidunt lorem rhoncus sed.</p>
        <p>Fusce vitae libero viverra, iaculis metus in, tincidunt orci. Integer sed placerat tellus. Sed mollis rhoncus velit in fringilla. Nunc pretium, nunc nec placerat volutpat, velit dui iaculis ex, eget tincidunt sapien velit a lacus. Curabitur consectetur arcu sit amet lectus dignissim ultricies. Phasellus eleifend pulvinar eleifend. Nulla consequat arcu ante, vel porttitor tortor lobortis commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
        <p>Nullam auctor, nunc non consectetur tristique, nisl nibh vulputate nunc, at ultricies nisi nunc a nibh. Nulla facilisi. Sed auctor, sem at aliquet vulputate.</p>
        <p>Integer congue sem nec luctus porttitor. Donec euismod nec purus vitae condimentum. Morbi sed elementum sapien. Suspendisse quis imperdiet sem. Cras ullamcorper iaculis velit, in aliquam nisi convallis a. Nam quam ante, rhoncus in sapien eget, egestas ultricies ipsum. Donec in lorem orci. Vivamus at urna id erat bibendum commodo. Duis a sapien dictum, imperdiet quam ut, posuere urna. Etiam in leo leo. </p>
        <p>Lorum ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nibh nec elit gravida sodales. Sed sed nibh in elit ullamcorper feugiat. Sed nec nibh et justo luctus ultricies. Sed non nibh.</p>`
    },
    {
        title: "Guide to Glyphs & Symbols",
        author: "Guy Smiley ☺",
        id: "123007",
        date: "2023-04-09T00:00:00.000Z",
        content: "<p>ӵ옻😃🙊♪Ⴀ🍕ẽ€ếⓒḉ</p><p>&amp;&#151;&copy;</p>"
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

const getPostById = function (id) {
    function isPost(post) {
        return post.id === id;
    };

    return testData.posts.find(isPost);
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
                    case "posts":
                        if ("id" in eventParameters) {
                            data = getPostById(eventParameters.id);
                        } else {
                            data = testData.posts;
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