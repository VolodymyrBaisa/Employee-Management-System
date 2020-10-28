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
        let table, json, roleId, managerId, departmentId, employeeName;
        const employee = {},
            role = {};
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
                //first name
                json = await questions.addEmployeeFirstName();
                table = await print.questions(json);
                employee.first_name = table.first_name;
                //last name
                json = await questions.addEmployeeLastName();
                table = await print.questions(json);
                employee.last_name = table.last_name;
                //role
                json = await questions.viewEmployeeRole();
                table = await print.questions(json);
                //get role id
                roleId = await dbManager.roleToRoleId(table.role);
                employee.role_id =
                    roleId.length > 0 ? roleId.map((a) => a.id)[0] : 1;
                //management
                json = await questions.viewEmployeeManagement();
                table = await print.questions(json);
                managerId = await dbManager.managerToManagerId(
                    table.manager_name
                );
                employee.manager_id =
                    managerId.length > 0 ? managerId.map((a) => a.id)[0] : 1;
                //add new employee
                await dbManager.addEmployee(employee);
                print.info("Employee successfully added.");
                break;

            case "Update Employee Role":
                //all employee
                json = await questions.updateEmployee();
                table = await print.questions(json);
                employeeName = table.updateEmployee;
                //all role
                json = await questions.updateEmployeeRole();
                table = await print.questions(json);
                //get role id
                roleId = await dbManager.roleToRoleId(table.updateRole);
                roleId = roleId.length > 0 ? roleId.map((a) => a.id)[0] : 1;

                await dbManager.updateEmployeeRole([roleId, employeeName]);
                print.info("Employee role successfully updated.");
                break;

            case "Update Employee Manager":
                //all employee exclude managers
                json = await questions.updateEmployeeExcludeManagement();
                table = await print.questions(json);
                employeeName = table.updateEmployee;

                json = await questions.updateEmployeeManagement();
                table = await print.questions(json);
                managerId = await dbManager.managerToManagerId(
                    table.updateManager
                );
                await dbManager.updateEmployeeManager([
                    managerId.length > 0 ? managerId.map((a) => a.id)[0] : 1,
                    employeeName,
                ]);
                print.info("Employee manager successfully updated.");
                break;

            case "Remove Employee":
                json = await questions.removeEmployee();
                table = await print.questions(json);
                employeeName = table.removeEmployee;

                await dbManager.removeEmployee(employeeName);
                print.info("Employee successfully deleted.");
                break;

            case "View All Roles":
                table = await dbManager.viewAllEmployeeRole();
                print.table(table);
                break;

            case "Add Role":
                json = await questions.addRole();
                table = await print.questions(json);
                role.title = table.role_title;

                json = await questions.addRoleSalary();
                table = await print.questions(json);
                role.salary = table.salary;

                json = await questions.viewRoleDepartment();
                table = await print.questions(json);
                //get department id
                departmentId = await dbManager.departmentToDepartmentId(
                    table.dept_name
                );
                departmentId =
                    departmentId.length > 0
                        ? departmentId.map((a) => a.id)[0]
                        : 1;
                role.department_id = departmentId;

                await dbManager.addRole(role);
                print.info("Role successfully added.");
                break;

            case "Remove Role":
                json = await questions.removeRole();
                table = await print.questions(json);
                await dbManager.removeRole(table.removeRole);
                print.info("Role successfully deleted");
                break;

            case "View All Departments":
                table = await dbManager.getAllDepartments();
                print.table(table);
                break;

            case "Add Department":
                json = await questions.addDepartment();
                table = await print.questions(json);
                console.log(table);
                await dbManager.addDepartment(table.dept_name);
                print.info("Department successfully added.");
                break;

            case "Remove Department":
                json = await questions.removeDept();
                table = await print.questions(json);
                await dbManager.removeDept(table.removeDept);
                print.info("Department successfully deleted.");
                break;

            case "EXIT":
                await dbManager.close();
                return false;
        }
        return true;
    }
};
