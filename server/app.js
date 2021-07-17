require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const { dbConnectionURL, connect } = require("./src/config/db");
const authRouter = require("./src/routes/auth.routes");

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

// APP'S ROUTES
app.use("/api/auth", authRouter);
app.get("/", (req, res) => {
	res.json({ hello: "dsdf" });
});

app.listen(PORT, () => {
	console.log("Server has been started on PORT ", PORT);
});
