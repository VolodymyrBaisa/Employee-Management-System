const fs = require("fs-extra");
const path = require("path");

const Print = require("../../view/print");
const print = new Print();

const DBManager = require("../db/dbManager");
const dbManager = new DBManager();

const questionsFile = path.resolve(__dirname, "questions.json");

module.exports = class Question {
    constructor() {
        this.questionsJson = fs.readJson(questionsFile);
    }
    async selectToDo() {
        return (await this.questionsJson).selectToDo;
    }

    async viewEmployeeDept() {
        const department = (await this.questionsJson).departments;
        department.choices = "choices";
        department["choices"] = async () => {
            const allDepartments = await dbManager.getAllDepartments();
            return allDepartments.map((a) => a["name"]);
        };
        return department;
    }

    async viewManagement() {
        const manager = await (await this.questionsJson).managers;
        manager.choices = "choices";
        manager["choices"] = async () => {
            const allManager = await dbManager.getAllManagers();
            return allManager.map(
                (a) => `${a["first_name"]} ${a["last_name"]}`
            );
        };
        return manager;
    }

    async addEmployeeFirstName() {
        const firstName = await (await this.questionsJson).addEmployeeFirstName;
        firstName.validate = "validate";
        firstName["validate"] = (answer) => {
            if (answer.length < 1) {
                return print.err("A valid first name is required.");
            }
            return true;
        };

        return firstName;
    }

    async addEmployeeLastName() {
        const lastName = await (await this.questionsJson).addEmployeeLastName;
        lastName.validate = "validate";
        lastName["validate"] = (answer) => {
            if (answer.length < 1) {
                return print.err("A valid last name is required.");
            }
            return true;
        };

        return lastName;
    }

    async viewEmployeeRole() {
        const employeeRole = await (await this.questionsJson).viewEmployeeRole;
        employeeRole.choices = "choices";
        employeeRole["choices"] = async () => {
            const allRole = await dbManager.viewAllEmployeeRole();
            return allRole.map((a) => a.title);
        };
        return employeeRole;
    }
    async viewEmployeeManagement() {
        const manager = await (await this.questionsJson).viewEmployeeManager;
        manager.choices = "choices";
        manager["choices"] = async () => {
            const allManager = await dbManager.getAllManagers();
            return allManager.map(
                (a) => `${a["first_name"]} ${a["last_name"]}`
            );
        };
        return manager;
    }

    async updateEmployee() {
        const updateEmployee = await (await this.questionsJson).updateEmployee;
        updateEmployee.choices = "choices";
        updateEmployee["choices"] = async () => {
            const table = await dbManager.viewAllEmployees();
            return table.map((a) => `${a["first_name"]} ${a["last_name"]}`);
        };
        return updateEmployee;
    }

    async updateEmployeeExcludeManagement() {
        const updateEmployee = await (await this.questionsJson).updateEmployee;
        updateEmployee.choices = "choices";
        updateEmployee["choices"] = async () => {
            const table = await dbManager.viewEmployeesExcludeManagers();
            return table.map((a) => `${a["first_name"]} ${a["last_name"]}`);
        };
        return updateEmployee;
    }

    async updateEmployeeRole() {
        const updateEmployeeRole = await (await this.questionsJson)
            .updateEmployeeRole;
        updateEmployeeRole.choices = "choices";
        updateEmployeeRole["choices"] = async () => {
            const table = await dbManager.viewAllEmployeeRole();
            return table.map((a) => a.title);
        };
        return updateEmployeeRole;
    }

    async updateEmployeeManagement() {
        const manager = await (await this.questionsJson).updateManager;
        manager.choices = "choices";
        manager["choices"] = async () => {
            const allManager = await dbManager.getAllManagers();
            return allManager.map(
                (a) => `${a["first_name"]} ${a["last_name"]}`
            );
        };
        return manager;
    }

    async removeEmployee() {
        const removeEmployee = await (await this.questionsJson).removeEmployee;
        removeEmployee.choices = "choices";
        removeEmployee["choices"] = async () => {
            const table = await dbManager.viewAllEmployees();
            return table.map((a) => `${a["first_name"]} ${a["last_name"]}`);
        };
        return removeEmployee;
    }

    async addRole() {
        const addRole = await (await this.questionsJson).addRole;
        addRole.validate = "validate";
        addRole["validate"] = (answer) => {
            if (answer.length < 1) {
                return print.err("A valid role is required.");
            }
            return true;
        };

        return addRole;
    }

    async addRoleSalary() {
        const addRoleSalary = await (await this.questionsJson).addRoleSalary;
        addRoleSalary.validate = "validate";
        addRoleSalary["validate"] = (answer) => {
            if (answer.length < 1) {
                return print.err("A valid salary is required.");
            }
            return true;
        };

        return addRoleSalary;
    }

    async viewRoleDepartment() {
        const department = await (await this.questionsJson).viewRoleDepartment;
        department.choices = "choices";
        department["choices"] = async () => {
            const allDepartments = await dbManager.getAllDepartments();
            return allDepartments.map((a) => a["name"]);
        };
        return department;
    }

    async removeRole() {
        const removeRole = await (await this.questionsJson).removeRole;
        removeRole.choices = "choices";
        removeRole["choices"] = async () => {
            const role = await dbManager.viewAllEmployeeRole();
            return role.map((a) => a["title"]);
        };
        return removeRole;
    }
};
