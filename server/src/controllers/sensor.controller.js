const Sensors = require("../models/sensor.model");

const getUserSensorsValue = async (req, res) => {
	// try {
	// 	const { room } = req.body;
	// 	let pressure = (Math.random() * (755 - 745) + 745).toFixed(2);
	// 	let temperature = (Math.random() * (26 - 24) + 24).toFixed(1);
	// 	let hum = (Math.random() * (35 - 30) + 30).toFixed(1);
	// 	await Sensors.updateMany(
	// 		{ user: req.session.user.id, sensorType: "Pressure", room },
	// 		{ value: pressure },
	// 	);
	// 	await Sensors.updateMany(
	// 		{ user: req.session.user.id, sensorType: "Temperature" },
	// 		{ value: temperature },
	// 	);
	// 	await Sensors.updateMany(
	// 		{ user: req.session.user.id, sensorType: "Temperature" },
	// 		{ value: hum },
	// 	);
	// 	const allUserSensors = await Sensors.find({ user: req.session.user.id });
	// 	res.json(allUserSensors);
	// } catch (error) {
	// 	res.sendStatus(500);
	// }
};
const addUserSensors = async (req, res) => {
	try {
		const { device: sensorName, currentTypeSensor: sensorType, room, picture } = req.body;
		const newSensor = await Sensors.create({
			sensorName,
			sensorType,
			room,
      picture,
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
		let pressure = (Math.random() * (755 - 745) + 745).toFixed(2);
		let temperature = (Math.random() * (26 - 24) + 24).toFixed(1);
		let hum = Math.round(Math.random() * (35 - 30) + 30);

		await Sensors.updateMany(
			{ user: req.session.user.id, sensorType: "Pressure", room, status: true },
			{ value: pressure },
		);
		await Sensors.updateMany(
			{ user: req.session.user.id, sensorType: "Temperature", status: true },
			{ value: temperature },
		);
		await Sensors.updateMany(
			{ user: req.session.user.id, sensorType: "Humidity", status: true },
			{ value: hum },
		);

		const roomSensors = await Sensors.find({ room });
		res.json(roomSensors);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const switchSensor = async (req, res) => {
	try {
		const { id, status } = req.body;

		const updatedSensor = await Sensors.findByIdAndUpdate(id, { status: !status }, { new: true });
		res.json(updatedSensor);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

module.exports = {
	getUserSensorsValue,
	addUserSensors,
	getSensorValueMovement,
	setSensorValueMovement,
	resetSensorValue,
	getUserRoomSensors,
	switchSensor,
};
