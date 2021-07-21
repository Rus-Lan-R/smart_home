const Devices = require("../models/device.model");
const Rooms = require("../models/room.model");
const fetch = require("node-fetch");

const getUserDevices = async (req, res) => {
	try {
		const allDevices = await Devices.find({ user: req.session.user.id });

		res.json(allDevices);
	} catch (error) {
		res.sendStatus(500);
	}
};

const getPowerConsumption = async (req, res) => {
	try {
		const allDevices = await Devices.find({ user: req.session.user.id });

		const homePowerConsumption = +allDevices
			.reduce((acc, el) => acc + el.expendedPower, 0)
			.toFixed(2);

		res.json(homePowerConsumption);
	} catch (error) {
		res.sendStatus(500);
	}
};

const addUserDevice = async (req, res) => {
	console.log(req.body);
	let path = null;
	let powerConsumption = 0;
	switch (req.body.deviceSpecific) {
		case "Lamp":
			path = "/api/esp/lamp/";
			powerConsumption = +(Math.random() * (200 - 50) + 50).toFixed(2);

			break;
		case "Heater":
			powerConsumption = +(Math.random() * (700 - 100) + 100).toFixed(2);

			path = "/api/esp/led/";

			break;
		case "Socket":
			path = "/api/esp/relay/";
			powerConsumption = +(Math.random() * (400 - 50) + 50).toFixed(2);
			break;
		case "LED Strip":
			powerConsumption = +(Math.random() * (700 - 100) + 100).toFixed(2);

			path = "/api/esp/led/";

			break;
		case "Boiler":
			powerConsumption = +(Math.random() * (700 - 100) + 100).toFixed(2);

			path = "/api/esp/boiler/";

			break;
		case "Fun":
			powerConsumption = +(Math.random() * (700 - 100) + 100).toFixed(2);

			path = "/api/esp/fun/";

			break;
		default:
			break;
	}
	const apiURL = `http://${req.body.ip}:${req.body.port}${path}`;
	console.log(apiURL);
	try {
		console.log(req.session);
		console.log(powerConsumption);
		const newDevice = await Devices.create({
			...req.body,
			apiURL,
			user: req.session.user.id,
			powerConsumption,
		});
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
		const prevStateDevice = await Devices.findOne({
			_id: req.body.id,
			user: req.session.user.id,
			status: true,
		});
		console.log(prevStateDevice);
		let updatedDevice;
		if (prevStateDevice) {
			const timeAfterOn = +(new Date().getTime() / 1000 - prevStateDevice.startWorkingTime).toFixed(
				2,
			);
			let timeWorking = prevStateDevice.timeWorking + timeAfterOn;
			let expendedPower = (
				prevStateDevice.expendedPower +
				(timeAfterOn / 3600) * prevStateDevice.powerConsumption
			).toFixed(2);

			updatedDevice = await Devices.findOneAndUpdate(
				{
					_id: req.body.id,
					user: req.session.user.id,
				},
				{ status: !req.body.status, timeWorking, expendedPower },
				{ new: true },
			);
		} else {
			const startWorkingTime = +(new Date().getTime() / 1000).toFixed(2);
			updatedDevice = await Devices.findOneAndUpdate(
				{
					_id: req.body.id,
					user: req.session.user.id,
				},
				{ status: !req.body.status, startWorkingTime },
				{ new: true },
			);
		}

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

module.exports = { getUserDevices, addUserDevice, changeStatus, getPowerConsumption };
