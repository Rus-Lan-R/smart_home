const { Schema, model } = require("mongoose");

const DeviceSchema = Schema({
	device: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
	picture: {
		type: String,
		default: "/defaultDevice.png",
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: "Room",
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	ip: {
		type: String,
	},
	port: {
		type: String,
	},
	apiURL: {
		type: String,
	},
});

module.exports = model("Device", DeviceSchema);
