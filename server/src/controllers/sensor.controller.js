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
		await Sensors.findOneAndUpdate(
			{ sensorType, status: true },
			{ $inc: { value: +value } },
			{ new: true },
		);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const resetSensorValue = async (req, res) => {
	console.log(req.body);
	try {
		const { sensorID } = req.body;
		const updatedSensor = await Sensors.findByIdAndUpdate(sensorID, { value: 0 }, { new: true });
		res.json(updatedSensor);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const getUserRoomSensors = async (req, res) => {
	try {
		const { roomID: room } = req.params;
		const roomSensors = await Sensors.find({ room });
		console.log(roomSensors);
		res.json(roomSensors);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const switchSensor = async (req, res) => {
	try {
		const { id, status } = req.body;

		console.log(req.body);

		const updatedSensor = await Sensors.findByIdAndUpdate(id, { status: !status }, { new: true });
		res.json(updatedSensor);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

module.exports = {
	getUserSensors,
	addUserSensors,
	getSensorValueMovement,
	setSensorValueMovement,
	resetSensorValue,
	getUserRoomSensors,
	switchSensor,
};
