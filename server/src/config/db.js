/* eslint-disable max-len */
const mongoose = require("mongoose");

const options = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
	poolSize: 10,
	bufferMaxEntries: 0,
};

const { DB_HOST, DB_NAME, DB_PORT } = process.env;

const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
// const dbConnectionURL = `mongodb+srv://ruslan:12345@cluster0.b1bxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

function connect() {
	mongoose.connect(dbConnectionURL, options, (err) => {
		if (err) console.error("ERROR WITH DB");

		console.log("Connect to DB");
	});
}

function disconnect() {
	mongoose.disconnect();
}

module.exports = { connect, disconnect, dbConnectionURL };
