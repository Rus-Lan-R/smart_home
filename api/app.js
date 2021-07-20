const express = require("express");
const cors = require("cors");
const http = require("http")
const WebSocket = require("ws")
// const gpio = require("rpi-gpio").promise;
const Gpio = require("onoff").Gpio;
let RED = new Gpio(17, "out");
let GREEN = new Gpio(27, "out");
let BLUE = new Gpio(22, "out");
const moveSensor = new Gpio(26, "in", "rising", { debounceTimeout: 10 })
const scannerRouter = require("./src/routers/networkScanner.routes");
const fetch = require("node-fetch");

const app = express();


const morgan = require("morgan");
// const GPIO = require("rpi-gpio");
app.use(morgan("dev"))


function clearState() {
	RED.read().then(() => RED.write(1));
	GREEN.read().then(() => GREEN.write(1));
	BLUE.read().then(() => BLUE.write(1));
}
clearState();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", scannerRouter);

app.get("/api/rpi/:color", (req, res) => {
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
		case "all":
			clearState();
			break;
	}
	res.json({});
});
moveSensor.watch((err, value)=> {
	err && console.log(err)
	 fetch("http://192.168.1.90:3001/api/sensor").then((request)=> console.log(request.ok)).catch((err)=>console.log(err))

	console.log("sensor",value)
})





app.listen(PORT, () => {
	console.log("Server has been started on PORT ", PORT);
});
