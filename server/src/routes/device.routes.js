const { Router } = require("express");
const { getUserDevices, addUserDevice } = require("../controllers/device.controller");
const deviceRouter = Router();

deviceRouter.route("/").get(getUserDevices).post(addUserDevice);

module.exports = deviceRouter;
