const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const signUp = async (req, res) => {
	const { userName, password, email } = req.body;

	if (userName && password && email) {
		try {
			const hashPassword = await bcrypt.hash(password, 11);
			const newUser = await userModel.create({
				name: userName,
				password: hashPassword,
				email,
			});

			req.session.user = {
				id: newUser._id,
				name: newUser.userName,
			};

			return res.json({ _id: newUser._id, name: newUser.name });
		} catch (error) {
			return res.sendStatus(500);
		}
	}

	return res.sendStatus(400);
};

const signIn = async (req, res) => {
	const { password, email } = req.body;

	if (password && email) {
		try {
			const currentUser = await userModel.findOne({ email });
			if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
				req.session.user = {
					id: currentUser._id,
					name: currentUser.name,
				};
				return res.json({
					_id: currentUser._id,
					name: currentUser.name,
				});
			}
			return res.sendStatus(401);
		} catch (error) {
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
