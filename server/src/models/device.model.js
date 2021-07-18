const { Schema, model, isValidObjectId } = require("mongoose");
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
	conectionParams: {
		type: Object,
	},
});

module.exports = model("Device", DeviceSchema);
