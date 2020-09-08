// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

//connecting the database
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

//Arrays needed to holding employee, department, and role info
let deptArr = [];
let roleArr = [];
let manArr = [];
let empArr = [];
let empIdArr = [];
let roleIdArr = [];
let deptIdArr = [];
let manIdArr = [];

//main menu questions
const mainMenu = [
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee", "Add Role", "Add Department", "Update Employee Role", "Exit"],
        name: "mainMenu"
    }
];

//Add Employee Questions
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

//Add Role Questions
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

//Add Department Questions
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

//Update Employee Questions
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

//Makes actual connection to db
connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

//Function for main menu and preloading/updating arrays
function afterConnection() {
    connection.query('SELECT title FROM role', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roleArr.push(data[i].title);
        }
    });

    connection.query('SELECT name FROM department', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            deptArr.push(data[i].name);
        }
    });

    connection.query('SELECT name FROM manager', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            manArr.push(data[i].name);
        }
    });

    connection.query('SELECT CONCAT(first_name, " ", last_name) AS full_name FROM employee', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            empArr.push(data[i].full_name);
        }
    });
    inquirer.prompt(mainMenu).then((mainChoice) => {
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

//Function for viewing all employees
function viewAll() {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON employee.role_id = role.id', (err, res) => {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
};

//Function for viewing all departments
function viewAllDept() {
    connection.query('SELECT id, name FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
};

//Function for viewing all roles
function viewAllRole() {
    connection.query('SELECT id, title, salary, department_id FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        afterConnection();
    });
};

//Function for adding employees
function addEmp() {
    connection.query('SELECT id, title FROM role', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roleIdArr.push(data[i]);
        }
    });
    connection.query('SELECT id, name FROM manager', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            manIdArr.push(data[i]);
        }
    });
    connection.query('SELECT title FROM role', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roleArr.push(data[i].title);
        }
    });
    inquirer.prompt(addEmployee).then((data) => {
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
            }, (err, res) => {
                if (err) throw err;
                console.log(firstName + " " + lastName + " added to employee list!\n");
                afterConnection();
            }
        );
    });
};

//Function for adding roles
function addRol() {
    connection.query('SELECT id, name FROM department', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            deptIdArr.push(data[i]);
        }
    });
    inquirer.prompt(addRole).then((data) => {
        let deptDetails = deptIdArr.find(obj => obj.name === data.roleDepartment);
        let role_salary = data.roleSalary;
        let role_title = data.roleTitle;
        let dept = deptDetails.id;
        connection.query("INSERT INTO role SET ?",
            {
                title: role_title,
                salary: role_salary,
                department_id: dept
            }, (err, res) => {
                if (err) throw err;
                console.log(role_title + " added to role list!\n");
                afterConnection();
            }
        );
    });
};

//Function for adding department
function addDept() {
    inquirer.prompt(addDepartment).then((data) => {
        let dept = data.departmentTitle;
        connection.query("INSERT INTO department SET ?",
            {
                name: dept,
            }, (err, res) => {
                if (err) throw err;
                console.log(dept + " added to department list!\n");
                afterConnection();
            }
        );
    });
};

//Function for updating employee roles
function updateEmp() {
    connection.query('SELECT id, title FROM role', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            roleIdArr.push(data[i]);
        }
    });
    connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee', (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            empIdArr.push(data[i]);
        }
    });
    inquirer.prompt(updateEmployee).then((data) => {
        let roleDetails = roleIdArr.find(obj => obj.title === data.emNewRole);
        let empDetails = empIdArr.find(obj => obj.full_name === data.emName);
        let role = roleDetails.id;
        let employee = empDetails.id;
        connection.query("UPDATE employee SET ? WHERE ?", [
            {
                role_id: role
            },
            {
                id: employee
            }
        ], (err, res) => {
            if (err) throw err;
            console.log(empDetails.full_name + " updated to " + roleDetails.title + " role!\n");
            afterConnection();
        }
        );
    });
};