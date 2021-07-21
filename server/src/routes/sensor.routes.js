const { Router } = require("express");
const sensorRouter = Router();
const {
	getUserSensors,
	addUserSensors,
	getSensorValueMovement,
	setSensorValueMovement,
	resetSensorValue,
	getUserRoomSensors,
	switchSensor,
} = require("../controllers/sensor.controller");

sensorRouter.route("/").get(getUserSensors).post(addUserSensors).put(switchSensor);
sensorRouter
	.route("/movement")
	.get(getSensorValueMovement)
	.post(setSensorValueMovement)
	.put(resetSensorValue);
sensorRouter.route("/roomSensors/:roomID").get(getUserRoomSensors);
// sensorRouter.route("/temperature").get(getSensorValue).post(setSensorValue);
// sensorRouter.route("/humidity").get(getSensorValue).post(setSensorValue);
// sensorRouter.route("/pressure").get(getSensorValue).post(setSensorValue);

module.exports = sensorRouter;
