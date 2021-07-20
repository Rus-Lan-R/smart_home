const Sensors = require("../models/sensor.model");

const getUserSensors = async (req, res) => {
	try {
	} catch (error) {
		res.sendStatus(500);
	}
};
const addUserSensors = async (req, res) => {
	console.log(req.body);
	try {
		const { device: sensorName, currentTypeSensor: sensorType, room } = req.body;
		const newSensor = await Sensors.create({
			sensorName,
			sensorType,
			room,
			user: req.session.user.id,
		});
		res.json(newSensor);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const getSensorValueMovement = async (req, res) => {
	try {
	} catch (error) {
		res.sendStatus(500);
	}
};

const setSensorValueMovement = async (req, res) => {
	console.log(req.body);
	try {
		const { value, sensorType } = req.body;
		await Sensors.findOneAndUpdate({ sensorType }, { value }, { new: true });
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
	}
};

module.exports = {
	getUserSensors,
	addUserSensors,
	getSensorValueMovement,
	setSensorValueMovement,
};
