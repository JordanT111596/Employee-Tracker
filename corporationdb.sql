-- If the database exists, remove it --
DROP DATABASE IF EXISTS corporation_db;

-- Creates the corporation database --
CREATE DATABASE corporation_db;

-- Uses the corporation database --
USE corporation_db;

-- Creates the department table --
CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

-- Creates the role table --
CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

-- Creates the employee table --
CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);

CREATE TABLE manager (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

INSERT INTO department (name)
VALUES ("Film Crew"), ("Administrative"), ("Production");

INSERT INTO role (title, salary, department_id)
VALUES ("Director", 100000, 1), ("Camera Operator", 50000, 1), ("Boom Operator", 45000, 1), ("Treasurer", 70000, 2), ("Producer", 120000, 2), ("Studio Executive", 200000, 2), ("Editor", 85000, 3), ("Production Assistant", 40000, 3), ("Promoter", 60000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jordan", "Triplett", 1), ("Karl", "Darlson", 1), ("Max", "Ah-Million", 6), ("Wilson", "Trank", 5);

INSERT INTO manager (name)
VALUES ("Jordan Triplett"), ("Karl Darlson"), ("Max Ah-Million"), ("Wilson Trank");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Finkle", 2, 1), ("Doug", "Malone", 3, 1), ("Rich", "Butters", 2, 2), ("Mel", "Felderman", 4, 3), ("Quincy", "Risk", 7, 4), ("Maxine", "Winters", 8, 2), ("Nancy", "Carbunkle", 8, 1), ("Otis", "Randy", 9, 3), ("Lisa", "Spinelli", 3, 2);