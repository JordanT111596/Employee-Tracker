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
let empIdArr = [];
let roleIdArr = [];
let deptIdArr = [];
let manIdArr = [];

const mainMenu = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Exit"],
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

// const viewByDepartment = [
//     {
//         type: "list",
//         message: "Which department?",
//         choices: deptArr,
//         name: "deptChoice"
//     }
// ];

// const viewByRole = [
//     {
//         type: "list",
//         message: "Which role?",
//         choices: roleArr,
//         name: "roleChoice"
//     }
// ];

const updateEmployee = [
    {
        type: "list",
        message: "Which employee do you want to update?",
        choices: empArr,
        name: "emName",
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

function afterConnection() {
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
    inquirer.prompt(mainMenu).then(function (mainChoice) {
        switch (mainChoice.mainMenu) {
            case "View All Employees":
                viewAll();
                break;
            case "View All Departments":
                viewAllDept();
                break;
            case "View All Roles":
                viewAllRole();
                break;
            case "Add Employee":
                addEmp();
                break;
            case "Add Role":
                addRol();
                break;
            case "Add Department":
                addDept();
                break;
            case "Update Employee Role":
                updateEmp();
                break;
                case "Exit":
                    connection.end();
                    break;

        }
    })
};

function viewAll() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON employee.role_id = role.id', function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
};

function viewAllDept() {
    connection.query('SELECT id, name FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
};

function viewAllRole() {
    connection.query('SELECT id, title, salary, department_id FROM role', function (err, res) {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
};

function addEmp() {
    connection.query('SELECT id, title FROM role', function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roleIdArr.push(data[i]);
        }
    });
    connection.query('SELECT id, name FROM manager', function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            manIdArr.push(data[i]);
        }
    });
    connection.query('SELECT title FROM role', function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roleArr.push(data[i].title);
        }
    });
    inquirer.prompt(addEmployee).then(function (data) {
        let roleDetails = roleIdArr.find(obj => obj.title === data.emRole);
        let manDetails = manIdArr.find(obj => obj.name === data.emManager);
        let firstName = data.emFirstName;
        let lastName = data.emLastName
        let role = roleDetails.id;
        let manager = manDetails.id;
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: firstName,
                last_name: lastName,
                role_id: role,
                manager_id: manager
            },
            function (err, res) {
                if (err) throw err;
                console.log(firstName + " " + lastName + " added to employee list!\n");
                afterConnection();
            }
        );
    });
};

function addRol() {
    connection.query('SELECT id, name FROM department', function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            deptIdArr.push(data[i]);
        }
    });
    inquirer.prompt(addRole).then(function (data) {
        let deptDetails = deptIdArr.find(obj => obj.name === data.roleDepartment);
        let role_salary = data.roleSalary;
        let role_title = data.roleTitle;
        let dept = deptDetails.id;
        connection.query("INSERT INTO role SET ?",
            {
                title: role_title,
                salary: role_salary,
                department_id: dept
            },
            function (err, res) {
                if (err) throw err;
                console.log(role_title + " added to role list!\n");
                afterConnection();
            }
        );
    });
};

function addDept() {
    inquirer.prompt(addDepartment).then(function (data) {
        let dept = data.departmentTitle;
        connection.query("INSERT INTO department SET ?",
            {
                name: dept,
            },
            function (err, res) {
                if (err) throw err;
                console.log(dept + " added to department list!\n");
                afterConnection();
            }
        );
    });
};

function updateEmp() {
    connection.query('SELECT id, title FROM role', function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roleIdArr.push(data[i]);
        }
    });
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee', function (err, data) {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            empIdArr.push(data[i]);
        }
    });
    inquirer.prompt(updateEmployee).then(function (data) {
        let roleDetails = roleIdArr.find(obj => obj.title === data.emNewRole);
        let empDetails = empIdArr.find(obj => obj.full_name === data.emName);
        let role = roleDetails.id;
        let employee = empDetails.id;
        connection.query("UPDATE employee SET ? WHERE ?",[
            {
                role_id: role
            },
            {
                id: employee
            }
        ],
            function (err, res) {
                if (err) throw err;
                console.log(empDetails.full_name + " updated to " + roleDetails.title +" role!\n");
                afterConnection();
            }
        );
    });
};