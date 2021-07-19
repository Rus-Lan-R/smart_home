const { Router } = require("express");
const scenarioRouter = Router();

const { getScenarios } = require("../controllers/scenario.controller");

scenarioRouter.route("/").get(getScenarios)

module.exports = scenarioRouter;
