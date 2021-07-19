import { SET_USER } from "../types/userTypes";

const userReducer = (state = null, action) => {
	switch (action.type) {
		case SET_USER:
			return action.payload;

		case "DELETE":
			return null;

		default:
			return state;
	}
};

export default userReducer;
