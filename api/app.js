const express = require("express");
const cors = require("cors");
const gpio = require("rpi-gpio").promise;
const Gpio = require("onoff").Gpio;
let RED = new Gpio(17, "out");
let GREEN = new Gpio(27, "out");
let BLUE = new Gpio(22, "out");

const scannerRouter = require("./src/routers/networkScanner.routes");

const app = express();

const PORT = process.env.PORT ?? 3001;

app.use(
	cors({
		origin: true,
		credentials: true,
	}),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", scannerRouter);

app.get("/api/rpi/:color", (req, res) => {
	let pin = 0;
	switch (req.params.color) {
		case "red":
			RED.read().then((value) => RED.write(value ^ 1));
			break;
		case "blue":
			BLUE.read().then((value) => BLUE.write(value ^ 1));
			break;
		case "green":
			GREEN.read().then((value) => GREEN.write(value ^ 1));
			break;
	}
	console.log(req.params.color);
	res.json({});
});

app.listen(PORT, () => {
	console.log("Server has been started on PORT ", PORT);
});
