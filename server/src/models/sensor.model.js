const { Schema, model } = require("mongoose");

const SensorSchema = Schema({
	sensorName: {
		type: String,
		required: true,
	},
	sensorType: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		default: false,
	},
	value: {
		type: String,
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
	picture: {
		type: String,
		default: "/defaultDevice.png",
	},
});

module.exports = model("Sensor", SensorSchema);
