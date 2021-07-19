const { Router } = require("express");
const deviceRouter = Router();
const { getUserDevices, addUserDevice, changeStatus } = require("../controllers/device.controller");

deviceRouter.route("/").get(getUserDevices).post(addUserDevice).put(changeStatus);

module.exports = deviceRouter;
