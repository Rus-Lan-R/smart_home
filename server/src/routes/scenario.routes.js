const { Router } = require("express");
const scenarioRouter = Router();

const { getScenarios, statusScenario } = require("../controllers/scenario.controller");

scenarioRouter.route("/").get(getScenarios).post(statusScenario)
module.exports = scenarioRouter;
