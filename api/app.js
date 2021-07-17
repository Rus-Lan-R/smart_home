const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
=======

>>>>>>> 454c3e653cd6517e716755bf91738e9ef2f85f74
const gpio = require("rpi-gpio").promise;
const Gpio = require("onoff").Gpio;
let RED = new Gpio(17, "out");
let GREEN = new Gpio(27, "out");
let BLUE = new Gpio(22, "out");
<<<<<<< HEAD
=======

const scannerRouter = require("./src/routers/networkScanner.routes");


>>>>>>> 454c3e653cd6517e716755bf91738e9ef2f85f74
const app = express();

function clearState() {
	RED.read().then(() => RED.write(1));
	GREEN.read().then(() => GREEN.write(1));
	BLUE.read().then(() => BLUE.write(1));
}
clearState();
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
<<<<<<< HEAD
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
=======

    switch (req.params.color) {
        case "red":
            RED.read().then(value => RED.write(value ^ 1))
            break;
        case "blue":
            BLUE.read().then(value => BLUE.write(value ^ 1))
            break;
        case "green":
            GREEN.read().then(value => GREEN.write(value ^ 1))
            break;
        case "all":
            clearState()
            break;
    }
    res.json({})
})

>>>>>>> 454c3e653cd6517e716755bf91738e9ef2f85f74

app.listen(PORT, () => {
	console.log("Server has been started on PORT ", PORT);
});
