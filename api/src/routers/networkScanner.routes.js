const { Router } = require("express");
const { getDevicesIp , getOpenPorts, connectDevice, refetch} = require("../controllers/networkScanner.controller");

const scannerRouter = Router();

scannerRouter.route("/network-scanner").get(getDevicesIp);
scannerRouter.route("/port-scanner").post(getOpenPorts);
scannerRouter.route("/connect-device").post(connectDevice);

scannerRouter.route("/refetch").post(refetch)

module.exports = scannerRouter;
