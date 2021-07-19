const { Router } = require("express");
const deviceRouter = Router();
const { getUserDevices, addUserDevice } = require("../controllers/device.controller");

deviceRouter.route("/").get(getUserDevices).post(addUserDevice);

module.exports = deviceRouter;
