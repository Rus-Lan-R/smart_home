import { SET_DEVICES_IP } from "../types/scanningIP.types";

const scanningIPReducer = (state = [], action) => {
	switch (action.type) {
		case SET_DEVICES_IP:
			return action.payload;

		case "DELETE":
			return [];

		default:
			return state;
	}
};

export default scanningIPReducer;
