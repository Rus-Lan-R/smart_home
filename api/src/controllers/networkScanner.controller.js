const netList = require("network-list");
const fetch = require("node-fetch");
const nodePortScanner = require("node-port-scanner");
// const Devices = require("../../../server/src/models/device.model");

const getDevicesIp = async (req, res) => {
	try {
		console.log("start scan ");
		netList.scan({}, (err, arr) => {
			let allDevices = arr.filter((el) => el.alive);
			console.log("send devices");
			res.json(allDevices);
		});
	} catch (error) {
		res.sendStatus(500);
	}
};

const getOpenPorts = async (req, res) => {
	console.log(req.body);
	try {
		const allPorts = await nodePortScanner(req.body.ip, [80, 3000, 3001]);
		console.log(allPorts);
		res.json(allPorts.ports.open);
	} catch (error) {
		res.sendStatus(500);
	}
};

const connectDevice = async (req, res) => {
	console.log(req.body);
	try {
		const responseConnect = await fetch(`http://${req.body.ip}:${req.body.port}/api/connect`);
		// console.log(responseConnect.ok)
		const statusResponse = await responseConnect.status;
		console.log(statusResponse);
		if (responseConnect.ok) {
			res.sendStatus(200);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

module.exports = {
	getDevicesIp,
	getOpenPorts,
	connectDevice,
};
