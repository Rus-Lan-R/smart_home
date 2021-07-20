const { Router } = require("express");
const sensorRouter = Router();
const {
	getUserSensors,
	addUserSensors,
	getSensorValueMovement,
	setSensorValueMovement,
} = require("../controllers/sensor.controller");

sensorRouter.route("/").get(getUserSensors).post(addUserSensors);
sensorRouter.route("/movement").get(getSensorValueMovement).post(setSensorValueMovement);
// sensorRouter.route("/temperature").get(getSensorValue).post(setSensorValue);
// sensorRouter.route("/humidity").get(getSensorValue).post(setSensorValue);
// sensorRouter.route("/pressure").get(getSensorValue).post(setSensorValue);

module.exports = sensorRouter;
