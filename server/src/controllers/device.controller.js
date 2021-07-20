const Devices = require("../models/device.model");
const Rooms = require("../models/room.model");
const fetch = require("node-fetch");

const getUserDevices = async (req, res) => {};

const addUserDevice = async (req, res) => {
	console.log(req.body);
	let path = null;
	switch (req.body.device.toLowerCase()) {
		case "socket":
			path = "/api/esp/lamp/";
			break;
		case "lamp":
			path = "/api/esp/relay/";

			break;
		case "heater":
			path = "/api/esp/led/";

			break;
		default:
			break;
	}
	const apiURL = `http://${req.body.ip}:${req.body.port}${path}`;
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

const changeStatus = async (req, res) => {
	try {
		const updatedDevice = await Devices.findOneAndUpdate(
			{
				_id: req.body.id,
				user: req.session.user.id,
			},
			{ status: !req.body.status },
			{ new: true },
		);
		console.log(updatedDevice.apiHUB);
		let action = null;
		if (updatedDevice.status) {
			action = "on";
		} else {
			action = "off";
		}
		const api = `${updatedDevice.apiURL}${action}`;
		console.log("esp", api);

		const responseSwich = await fetch("http://192.168.1.148:3001/api/refetch", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ api }),
		});

		console.log(responseSwich.ok);
		if (responseSwich.ok) {
			res.json(updatedDevice);
		} else {
			res.sendStatus(500);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

module.exports = { getUserDevices, addUserDevice, changeStatus };
