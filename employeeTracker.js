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
    database: "playlist_db"
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
    });
//     connection.query("SELECT * FROM products", function (err, res) {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     });
}