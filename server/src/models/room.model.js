const { Schema, model } = require("mongoose");
const User = require("./user.model")

const RoomSchema = Schema({
  room: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  picture: {
    type: String,
    default: '/defaultRoom.png'
  },
});

module.exports = model("Room", RoomSchema);

