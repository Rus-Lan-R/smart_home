const { Router } = require("express");
const deviceRouter = Router();
const {
	getUserDevices,
	addUserDevice,
	changeStatus,
	getPowerConsumption,
} = require("../controllers/device.controller");

deviceRouter.route("/").get(getUserDevices).post(addUserDevice).put(changeStatus);
deviceRouter.route("/powerConsumptions").get(getPowerConsumption);

module.exports = deviceRouter;
