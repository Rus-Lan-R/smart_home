import { SET_DEVICES_IP, CLEAR_SCANNING_DEVICES } from "../types/scanningIP.types";

const scanningIPReducer = (state = [], action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_DEVICES_IP:
			return [...state, ...payload];

		case CLEAR_SCANNING_DEVICES: {
			return [];
		}

		case "DELETE": {
			return [];
		}

		default:
			return state;
	}
};

export default scanningIPReducer;
