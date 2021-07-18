const netList = require("network-list");

const getDevicesIp = async (req, res) => {
	netList.scan({}, (err, obj) => {
		if (obj.alive) {
			console.log(obj);
			res.json(obj);
		} // device object
	});
};

module.exports = {
	getDevicesIp,
};
