--Drop and create new Database and use it
DROP DATABASE IF EXISTS EmployeeTracker;

CREATE DATABASE IF NOT EXISTS EmployeeTracker;

USE EmployeeTracker;
--Create table Department
CREATE TABLE IF NOT EXISTS department (
  id int AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);
--Create table Role
CREATE TABLE IF NOT EXISTS role (
  id int AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id int NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);
--Create table Employee
CREATE TABLE IF NOT EXISTS employee (
  id int AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id int NULL,
  manager_id int NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
