const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const signUp = async (req, res) => {
	console.log("SIGNUP req.body", req.body);
	const { userName, userPassword, userEmail } = req.body;

	if (userName && userPassword && userEmail) {
		try {
			const hashPassword = await bcrypt.hash(userPassword, 8);
			console.log(hashPassword);

			const newUser = await userModel.create({
				name: userName,
				password: hashPassword,
				email: userEmail,
			});
			console.log("db");

			req.session.user = {
				id: newUser._id,
				name: newUser.name,
			};
			console.log("SIGNUP req.session", req.session);

			return res.json({ _id: newUser._id, name: newUser.name });
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	}

	return res.sendStatus(400);
};

const signIn = async (req, res) => {
	const { userPassword, userEmail } = req.body;

	console.log("SIGNIN req.body  --> ", req.body);

	if (userPassword && userEmail) {
		try {
			const currentUser = await userModel.findOne({ email: userEmail });

			if (currentUser && (await bcrypt.compare(userPassword, currentUser.password))) {
				req.session.user = {
					id: currentUser._id,
					name: currentUser.name,
				};
				console.log("SIGNIN req.session --> ", req.session);
				return res.json({
					_id: currentUser._id,
					name: currentUser.name,
				});
			}
			return res.sendStatus(401);
		} catch (error) {
			console.log(error);
			return res.sendStatus(500);
		}
	}

	return res.sendStatus(400);
};

const signOut = async (req, res) => {
	console.log("LOGOUT", req.session);
	req.session.destroy((err) => {
		if (err) return res.sendStatus(500);
		res.clearCookie(req.app.get("cookieName"));

		return res.sendStatus(200);
	});
};

const checkAuth = async (req, res) => {
	try {
		const user = await userModel.findById(req.session.user.id, { password: 0 });
		console.log("back", user);
		return res.json(user);
	} catch (error) {
		return res.sendStatus(500);
	}
};

module.exports = {
	signIn,
	signOut,
	signUp,
	checkAuth,
};
