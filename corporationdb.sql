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

-- CREATE TABLE manager (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   name VARCHAR(30) NOT NULL
-- )