const Scenarios = require("../models/scenario.model");
const Devices = require("../models/device.model");
const fetch = require("node-fetch");

const getScenarios = async (req, res) => {
	// try {
	//   const userId = req.session.user.id;
	//   const allUserScenarios = await Scenarios.find({ user: userId });
	//   res.json(allUserScenarios);
	// } catch (error) {
	//   res.sendStatus(500);
	// }
};

const statusScenario = async (req, res) => {
	const userId = req.session.user.id;
	console.log(req.body.nameScenario);
	console.log(userId);

	switch (req.body.nameScenario.toLowerCase()) {
		case "ruslik party":
			//включить ленту
			break;
		case "i'm in home":
			//включить свет
			const allUserLamps = await Devices.updateMany(
				{ user: userId, device: "Lamp" },
				{ status: true },
				{ new: true },
			);
			// await Devices.find({ user: userId, device: "lamp" })

			console.log("allUserLamps", allUserLamps);
			// allUserLamps.forEach(async (device) => {
			// 	const api = `${device.apiURL}on`;
			// 	const responseSwich = await fetch("http://192.168.1.148:3001/api/refetch", {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify({ api }),
			// 	});
			// });
			//выключить датчик движения
			break;
		case "i'm not home":
			//выключить свет
			break;
		default:
			break;
	}
};

module.exports = { getScenarios, statusScenario };
