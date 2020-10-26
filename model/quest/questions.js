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
};
