// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // The port; if not 3306
    port: 3306,

    // The username
    user: "root",

    // The password and connected database
    password: "rootroot",
    database: "corporation_db"
});

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
        //choices: connection.role.title,
        name: "emRole"
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        //choices: connection.manager.name,
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
        // choices: connection.department.name,
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
        // choices: connection.department.name,
        name: "deptChoice"
    }
];

const viewByRole = [
    {
        type: "list",
        message: "Which role?",
        // choices: connection.role.title,
        name: "roleChoice"
    }
];

const updateEmployee = [
    {
        type: "list",
        message: "Which employee do you want to update?",
        // choices: connection.employee.id, ??????????
        name: "emID",
    },
    {
        type: "list",
        message: "Which role is this employee switching to?",
        // choices: connection.role.title,
        name: "emNewRole",
    }
];

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    inquirer.prompt(mainMenu).then(function (mainChoice) {
        console.log(mainChoice.mainMenu);
        if (mainChoice.mainMenu === "View All Employees") {
            //function that shows a table of employees
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "View All Employees by Department") {
            //function that inquires about which department
            //then shows a table of employees by that department
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "View All Employees by Role") {
            //function that inquires about which role
            //then shows a table of employees by that role
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "Add Employee") {
            //function that inquires from addEmployee questions
            //then takes those answers and inserts them into database table
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "Add Role") {
            //function that inquires from addRole questions
            //then takes those answers and inserts them into database table
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "Add Department") {
            //function that inquires from addDepartment questions
            //then takes those answers and inserts them into database table
            //make that function link back to afterConnection()
        } else if (mainChoice.mainMenu === "Update Employee Role") {
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
}