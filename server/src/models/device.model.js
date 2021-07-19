<<<<<<< HEAD
const { Schema, model, isValidObjectId } = require("mongoose");
=======
const { Schema, model } = require("mongoose");
>>>>>>> 57dbb228cfd7c8e5802118138a640bbca3c31282
const User = require("./user.model");
const Room = require("./room.model");

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
