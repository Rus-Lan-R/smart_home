import { SET_DEVICES_IP } from "../types/scanningIP.types";

const sacannigIPReducer = (state = [], action) => {
	switch (action.type) {
		case SET_DEVICES_IP:
			console.log(action.payload);
			return action.payload;

		default:
			return state;
	}
};

export default sacannigIPReducer;
