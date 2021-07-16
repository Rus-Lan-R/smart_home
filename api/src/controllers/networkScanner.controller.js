// const NetworkScanner = require("network-scanner-js");
// const netScan = new NetworkScanner();

// const Evilscan = require("evilscan");

// const config = {
// 	repeat: 4, //Specifies how many pings to send to the host, if null default is 1
// 	size: 56, //Size of bytes in each packet sent, if null default is 32
// 	timeout: 1, //Specifies the timeout of each ping in seconds, if null default is 1
// };

// async function ping() {
// 	const poll = await netScan.poll("192.168.1.1", config);
// 	console.log(poll);
// }
// ping();

// netScan.ipScan("192.168.1.0-254", (host) => {
// 	console.log(host.ip_address, "\n", host.status);
// });
// netScan.poll("192.168.1.148", config).then((res) => {
// 	console.log(res);
// });

// const options = {
// 	target: "192.168.1.148",
// 	port: "0-65535",
// 	status: "O", // Timeout, Refused, Open, Unreachable
// 	banner: true,
// };

// const evilscan = new Evilscan(options);

// evilscan.on("result", (data) => {
// 	// fired when item is matching options
// 	// if (data.status === "open")  //// Timeout, Refused, Open, Unreachable
// 	console.log(data);
// });

// evilscan.on("error", (err) => {
// 	throw new Error(data.toString());
// });

// evilscan.on("done", () => {
// 	// finished !
// 	console.log("FINISHED");
// });

// evilscan.run();

const netList = require("network-list");

// netList.scanEach({}, (err, obj) => {
// 	if (obj.alive) console.log(obj); // device object
// });

// netList.scan({}, (err, arr) => {
// 	console.log(arr); // array with all devices
// });

const getDevicesIp = async (req, res) => {
	netList.scan({}, (err, arr) => {
		let allDevices = arr.filter((el) => el.alive)
		res.json(allDevices)
	});
};

module.exports = {
	getDevicesIp,
};
