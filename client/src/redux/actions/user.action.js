import { SET_USER } from "../types/userTypes";
import * as authEndPoints from "../../config/authEndPoints";

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const signUp = (payload, history) => async (dispatch) => {
	try {
		const response = await fetch(authEndPoints.signUp(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(payload),
		});
		if (response.status === 200) {
			const user = await response.json();
			
			dispatch(setUser(user));
			history.replace("/home");
		} else {
			history.replace("/signup");
		}
	} catch (error) {
		console.log(error);
	}
};

export const signIn = (payload, history, from) => async (dispatch) => {
	try {
		const response = await fetch(authEndPoints.signIn(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(payload),
		});

		if (response.status === 200) {
			const user = await response.json();
			
			dispatch(setUser(user));
			history.replace("/home");
			// history.replace(from);
		} else {
			history.replace("/signin");
		}
	} catch (error) {
		console.log(error);
	}
};

export const signOut = () => async (dispatch) => {
	try {
		
		const response = await fetch(authEndPoints.signOut(), {
			credentials: "include",
		});
		if (response.status === 200) {
			dispatch(deleteUser());
		}
	} catch (error) {
		console.log(error);
	}
};

export const checkAuth = () => async (dispatch) => {
	try {
		const response = await fetch(authEndPoints.checkAuth(), {
			credentials: "include",
		});
		if (response.status === 200) {
			const user = await response.json();
			dispatch(setUser(user));
		}
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = () => ({
	type: "DELETE",
});
