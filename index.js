const Controller = require("./controller/controller");
const controller = new Controller();

(async () => {
    controller.renderLogo();
    await controller.renderQuestions();
})();
