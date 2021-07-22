const { Schema, model } = require('mongoose');
const User = require('./user.model');

const RoomSchema = Schema({
  room: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  picture: {
    type: String,
    default: 'FaReact',
  },
  devices: [{ type: Schema.Types.ObjectId, ref: 'Device' }],
  ////// Styles for marker
  color: {
    type: String,
    default: "red"
  },
  height: 0,
  width: 0,
  left: {
    type: String,
    default: "0px"
  },
  position: {
    type: String,
    default: "relative"
  },
  top: {
    type: String,
    default: "0px"
  },
  visibility: {
    type: String,
    default: "hidden"
  },
});

module.exports = model('Room', RoomSchema);
