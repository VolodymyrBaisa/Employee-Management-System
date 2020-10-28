const DB = require("../db/db");
const db = new DB("localhost", "3306", "root", "0000", "EmployeeTracker");

module.exports = class DBManager {
    constructor() {
        db.connect();
    }
    async viewAllEmployees() {
        const q = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, e2.first_name as manager FROM employee
        LEFT JOIN employee e2 ON e2.id=employee.manager_id
        INNER JOIN role ON employee.role_id=role.id
        INNER JOIN department ON role.department_id=department.id
        ORDER BY employee.id`;

        return await db.query(q);
    }

    async viewEmployeesExcludeManagers() {
        const q = `SELECT employee.first_name, employee.last_name, employee.manager_id FROM employee
        LEFT JOIN employee e2 ON e2.id=employee.manager_id
        WHERE employee.manager_id IS NOT NULL`;

        return await db.query(q);
    }

    async getAllDepartments() {
        const q = "SELECT * FROM department";

        return await db.query(q);
    }

    async viewEmployeeDept(department) {
        const q = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, e2.first_name as manager FROM employee
        LEFT JOIN employee e2 ON e2.id=employee.manager_id
        INNER JOIN role ON employee.role_id=role.id
        INNER JOIN department ON role.department_id=department.id
        WHERE department.name = ?
        ORDER BY employee.id`;

        return await db.query(q, department);
    }

    async getAllManagers() {
        const q = `SELECT DISTINCT employee.first_name, employee.last_name FROM employee
        LEFT JOIN employee e2 ON e2.id=employee.manager_id
        WHERE employee.manager_id IS NULL`;

        return await db.query(q);
    }

    async viewEmployeeByManagement(manager) {
        const q = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e2.first_name, ' ', e2.last_name) as manager FROM employee
        LEFT JOIN employee e2 ON e2.id=employee.manager_id
        INNER JOIN role ON employee.role_id=role.id
        INNER JOIN department ON role.department_id=department.id
        WHERE CONCAT(e2.first_name, ' ', e2.last_name) = ?
        ORDER BY employee.id`;

        return await db.query(q, manager);
    }

    async viewAllEmployeeRole() {
        const q = `SELECT role.title FROM role`;

        return await db.query(q);
    }

    async roleToRoleId(role) {
        const q = `SELECT id FROM role WHERE title=?`;

        return await db.query(q, role);
    }

    async managerToManagerId(manager) {
        const q = `SELECT id FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name)=?`;

        return await db.query(q, manager);
    }

    async departmentToDepartmentId(department) {
        const q = `SELECT id FROM department WHERE name=?`;

        return await db.query(q, department);
    }

    async addEmployee(employee) {
        const q = `INSERT INTO employee SET ?`;

        return await db.query(q, employee);
    }

    async updateEmployeeRole(args) {
        const q = `UPDATE employee SET employee.role_id = ? WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?`;

        return await db.query(q, args);
    }

    async updateEmployeeManager(args) {
        const q = `UPDATE employee SET employee.manager_id = ? WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?`;

        return await db.query(q, args);
    }

    async removeEmployee(employee) {
        const q = `DELETE FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = ?`;

        return await db.query(q, employee);
    }

    async addRole(role) {
        const q = `INSERT INTO role SET ?`;

        return await db.query(q, role);
    }

    async removeRole(role) {
        const q = `DELETE FROM role WHERE title=?`;

        return await db.query(q, role);
    }

    async addDepartment(department) {
        const q = `INSERT INTO department (name) VALUES (?)`;

        return await db.query(q, department);
    }

    async removeDept(department) {
        const q = `DELETE FROM department WHERE name=?`;

        return await db.query(q, department);
    }

    async close() {
        db.close();
    }
};
