require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const { dbConnectionURL, connect } = require("./src/config/db");
const authRouter = require("./src/routes/auth.routes");
const deviceRouter = require("./src/routes/device.routes");
const roomRouter = require("./src/routes/room.routes.js");
const http = require("http");
const WebSocket = require("ws");

const app = express();

const PORT = process.env.PORT ?? 3001;

connect();

if (process.env.DEV) {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

app.set("cookieName", process.env.COOKIE_NAME);

app.use(
	cors({
		origin: true,
		credentials: true,
	}),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
	session({
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
	}),
);

app.use("/api/auth", authRouter);
app.use("/api/room", roomRouter);
app.use("/api/devices", deviceRouter);

app.get("/scenario/", async (req, res) => {
	const userId = req.session.user.id;
	const allUserScenarios = await Scenario.find({ user: userId });
	res.json(allUserScenarios);
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

server.on("upgrade", (request, socket, head) => {
	console.log("Parsing session from request...");

	sessionParser(request, {}, () => {
		if (!request.session.user?.id) {
			socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
			socket.destroy();
			return;
		}

		console.log("Session is parsed!");

		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit("connection", ws, request);
		});
	});
});

wss.on("connection", (ws, request) => {
	const {
		user: { id },
	} = request.session;

	map.set(id, ws);

	ws.on("message", (message) => {
		const parsedMessage = JSON.parse(message);

		switch (parsedMessage.type) {
			case "SOCKET_CONNECT":
				map.forEach((client) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(
							JSON.stringify({
								type: parsedMessage.type,
								payload: `${id} присоединился`,
							}),
						);
					}
				});
				break;

			case "SOCKET_MESSAGE":
				map.forEach((client, key) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(
							JSON.stringify({
								type: parsedMessage.type,
								payload: {
									message: parsedMessage.payload,
									isIam: key === id,
								},
							}),
						);
					}
				});
				break;
			default:
				break;
		}

		console.log(`Received message ${message} from user ${id}`);
	});

	ws.on("close", () => {
		map.delete(id);
	});
});

server.listen(PORT, () => {
	console.log("Server has been started on port: ", PORT);
});
