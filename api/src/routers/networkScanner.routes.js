const { Router } = require("express");
const { getDevicesIp } = require("../controllers/networkScanner.controller");

const scannerRouter = Router();

scannerRouter.route("/network-scanner").get(getDevicesIp);

module.exports = scannerRouter;
