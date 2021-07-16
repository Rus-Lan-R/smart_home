const { Router } = require("express");
const { getDevicesIp } = require("../controllers/networkScanner.controller");

const scannerRouter = Router();

router.route("/network-scanner").get(getDevicesIp);

module.exports = scannerRouter;
