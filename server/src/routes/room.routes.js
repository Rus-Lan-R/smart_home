const { Router } = require("express");
const roomRouter = Router();

const { addUserRoom, getUserRooms, getUserRoomDevices } = require("../controllers/room.controller");

roomRouter.route("/").get(getUserRooms).post(addUserRoom);
roomRouter.route("/roomDevices/:idRoom").get(getUserRoomDevices);

module.exports = roomRouter;
