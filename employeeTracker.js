// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // The port; if not 3306
    port: 3306,

    // The username
    user: "root",

    // The password and connected database
    password: "rootroot",
    database: "corporation_db"
});

let deptArr = [];
let roleArr = [];
let manArr = [];
let empArr = [];

const mainMenu = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees by Department", "View All Employees by Role", "Add Employee", "Add Role", "Add Department", "Update Employee Role"],
        name: "mainMenu"
    }
];

const addEmployee = [
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "emFirstName"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "emLastName"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        choices: roleArr,
        name: "emRole"
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        choices: manArr,
        name: "emManager"
    }
];

const addRole = [
    {
        type: "input",
        message: "What is the title of this role?",
        name: "roleTitle"
    },
    {
        type: "input",
        message: "What is the salary of this role?",
        name: "roleSalary"
    },
    {
        type: "list",
        message: "What department is this role in?",
        choices: deptArr,
        name: "roleDepartment"
    }
];

const addDepartment = [
    {
        type: "input",
        message: "What is the title of this department?",
        name: "departmentTitle"
    }
];

const viewByDepartment = [
    {
        type: "list",
        message: "Which department?",
        choices: deptArr,
        name: "deptChoice"
    }
];

const viewByRole = [
    {
        type: "list",
        message: "Which role?",
        choices: roleArr,
        name: "roleChoice"
    }
];

const updateEmployee = [
    {
        type: "list",
        message: "Which employee do you want to update?",
        choices: empArr,
        name: "emID",
    },
    {
        type: "list",
        message: "Which role is this employee switching to?",
        choices: roleArr,
        name: "emNewRole",
    }
];

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

connection.query('SELECT title FROM role', function (err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
    roleArr.push(data[i].title);
    }
});

connection.query('SELECT name FROM department', function (err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
    deptArr.push(data[i].name);
    }
});

connection.query('SELECT name FROM manager', function (err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
    manArr.push(data[i].name);
    }
});

connection.query('SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee', function (err, data) {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
    empArr.push(data[i].full_name);
    }
});

function afterConnection() {
    inquirer.prompt(mainMenu).then(function (mainChoice) {
        if (mainChoice.mainMenu === "View All Employees") {
            viewAll();
            //function that shows a table of employees
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "View All Employees by Department") {
            viewAllByDept();
            //function that inquires about which department
            //then shows a table of employees by that department
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "View All Employees by Role") {
            viewAllByRole();
            //function that inquires about which role
            //then shows a table of employees by that role
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "Add Employee") {
            addEmp();
            //function that inquires from addEmployee questions
            //then takes those answers and inserts them into database table
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "Add Role") {
            addRole();
            //function that inquires from addRole questions
            //then takes those answers and inserts them into database table
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "Add Department") {
            addDept();
            //function that inquires from addDepartment questions
            //then takes those answers and inserts them into database table
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "Update Employee Role") {
            updateEmp();
            //function that inquires from updateEmployee questions
            //then selects the employee we're updating
            //then updates that specific employee's data in the listing
            //make that function link back to afterConnection()
        }
    });
    //     connection.query("SELECT * FROM products", function (err, res) {
    //         if (err) throw err;
    //         console.table(res);
    //     });
};

// function viewAll() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//     });
//     afterConnection();
// };

// function viewAllByDept() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//     });
//     afterConnection();
// };

// function viewAllByRole() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//     });
//     afterConnection();
// };

function addEmp() {
    inquirer.prompt(addEmployee).then(function (data) {
        let firstName = data.emFirstName;
        let lastName = data.emLastName;
        let role = data.emRole;
        let manager = data.emManager;
        connection.query("INSERT INTO employee SET ?",
            {
              first_name: firstName,
              last_name: lastName,
              role_id: role,
              manager_id: manager
            },
            function(err, res) {
              if (err) throw err;
              console.log(firstName + " " + lastName + " added to employee list!\n");
            }
          );
        //insert to database using data
        //console log that it was succesful
    });
};

// function addRole() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//     });
//     afterConnection();
// };

// function addDept() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//     });
//     afterConnection();
// };

// function updateEmp() {
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.table(res);
//     });
//     afterConnection();
// };