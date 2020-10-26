const chalk = require("chalk");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");

const errorStyle = chalk.bold.red;
const successStyle = chalk.bold.green;
const infoStyle = chalk.bold.blue;

module.exports = class Print {
    logo(name) {
        console.log(successStyle(logo({ name }).render()));
    }

    err(msg) {
        console.log(errorStyle(msg.stack));
    }

    success(msg) {
        console.log(successStyle(msg));
    }

    info(msg) {
        console.log(infoStyle(msg));
    }

    table(msg) {
        console.table(msg);
    }

    async questions(questions) {
        return await inquirer.prompt(questions);
    }
};
