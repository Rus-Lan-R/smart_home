require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const { dbConnectionURL, connect } = require("./src/config/db");
const authRouter = require("./src/routes/auth.routes");
const deviceRouter = require("./src/routes/device.routes");
const roomRouter = require("./src/routes/room.routes.js");
const scenarioRouter = require("./src/routes/scenario.routes");
const sensorRouter = require("./src/routes/sensor.routes.js");
const markerRouter = require("./src/routes/marker.routes.js");

const app = express();

const PORT = process.env.PORT ?? 3001;

connect();

if (process.env.DEV) {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

const sessionParser = session({
	name: app.get("cookieName"),
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
		mongoUrl: dbConnectionURL,
	}),
	cookie: {
		secure: false,
		httpOnly: true,
		maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
	},
});

app.set("cookieName", process.env.COOKIE_NAME);
app.set("trust proxy", 1);

app.use(
	cors({
		origin: true,
		credentials: true,
	}),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(sessionParser);

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);
app.use("/api/devices", deviceRouter);
app.use("/api/scenario", scenarioRouter);
app.use("/api/sensors", sensorRouter);
app.use("/api/markers", markerRouter);

app.listen(PORT, () => {
	console.log("Server has been started on port: ", PORT);
});
