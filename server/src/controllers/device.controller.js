const Devices = require("../models/device.model");
const Rooms = require("../models/room.model");

const getUserDevices = async (req, res) => {};

const addUserDevice = async (req, res) => {
	console.log(req.body);
	const apiURL = `http://${req.body.ip}:${req.body.port}`;
	try {
		console.log(req.session);
		const newDevice = await Devices.create({ ...req.body, apiURL, user: req.session.user.id });
		const room = await Rooms.findByIdAndUpdate(
			req.body.room,
			{ $push: { devices: newDevice._id } },
			{ new: true },
		);
		console.log(room);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

//

http: module.exports = { getUserDevices, addUserDevice };
