var pjson = require("../package.json");

const Questions = require("../model/quest/questions");
const questions = new Questions();

const Print = require("../view/print");
const print = new Print();

const DBManager = require("../model/db/dbManager");
const dbManager = new DBManager();

module.exports = class Controller {
    renderLogo() {
        print.logo(pjson.name);
    }

    async renderQuestions() {
        try {
            const json = await questions.selectToDo();
            let isRunning = false;
            do {
                const answer = await print.questions(json);
                isRunning = await this.answerProcessor(answer);
            } while (isRunning);
        } catch (err) {
            print.err(err);
        }
    }

    async answerProcessor(answer) {
        let table, json;
        switch (answer.action) {
            case "View All Employees":
                table = await dbManager.viewAllEmployees();
                print.table(table);
                break;

            case "View All Employees by Department":
                json = await questions.viewEmployeeDept();
                answer = await print.questions(json);
                table = await dbManager.viewEmployeeDept(answer.department);
                print.table(table);
                break;

            case "View All Employees by Manager":
                json = await questions.viewManagement();
                answer = await print.questions(json);
                table = await dbManager.viewEmployeeByManagement(
                    answer.manager
                );
                print.table(table);
                break;

            case "Add Employee":
                let answerFirstName,
                    answerLastName,
                    answerRole,
                    roleId,
                    answerManager,
                    managerId,
                    employee = {};
                //first name
                json = await questions.addEmployeeFirstName();
                answerFirstName = await print.questions(json);
                employee.first_name = answerFirstName.first_name;
                //last name
                json = await questions.addEmployeeLastName();
                answerLastName = await print.questions(json);
                employee.last_name = answerLastName.last_name;
                //role
                json = await questions.viewEmployeeRole();
                answerRole = await print.questions(json);
                //get role id
                roleId = await dbManager.roleToRoleId(answerRole.role);
                employee.role_id =
                    roleId.length > 0 ? roleId.map((a) => a.id)[0] : 1;
                //management
                json = await questions.viewEmployeeManagement();
                answerManager = await print.questions(json);
                managerId = await dbManager.managerToManagerId(
                    answerManager.manager_name
                );
                employee.manager_id =
                    managerId.length > 0 ? managerId.map((a) => a.id)[0] : 1;
                //add new employee
                dbManager.addEmployee(employee);
                print.info("Employee successfully added.");
                break;

            case "Update Employee Role":
                break;

            case "Update Employee Manager":
                break;

            case "Remove Employee":
                break;

            case "View All Roles":
                break;

            case "Add Role":
                break;

            case "Remove Role":
                break;

            case "View All Departments":
                break;

            case "Add Department":
                break;

            case "Remove Department":
                break;

            case "EXIT":
                await dbManager.close();
                return false;
        }
        return true;
    }
};
