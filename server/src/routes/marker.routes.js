const { Router } = require("express");
const markerRouter = Router();

const { updateMarker } = require("../controllers/marker.controller");

markerRouter.route("/").patch(updateMarker);

module.exports = markerRouter;
