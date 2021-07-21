const Devices = require("../models/device.model");
const Rooms = require("../models/room.model");

const addUserRoom = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const newRoom = await Rooms.create({ room: req.body.room, user: userId });
    res.json(newRoom);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUserRooms = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const allUserRooms = await Rooms.find({ user: userId });
    console.log(allUserRooms);
    res.json(allUserRooms);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getUserRoomDevices = async (req, res) => {
  try {
    const { idRoom } = req.params;
    const userId = req.session.user.id;
    const allRoomDevices = await Devices.find({ user: userId, room: idRoom });
    res.json(allRoomDevices);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { addUserRoom, getUserRooms, getUserRoomDevices };
