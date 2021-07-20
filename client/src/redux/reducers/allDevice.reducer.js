import {
	ALL_DEVICES_LOADING_START,
	ALL_DEVICES_LOADING_ERROR,
	ALL_DEVICES_GET_SUCCESS,
} from "../types/allDevices.types";

export default function deviceReducer(state = {}, action) {
	const { type, payload } = action;

	switch (type) {
		case ALL_DEVICES_LOADING_START: {
			return { ...state, isLoading: true };
		}
		case ALL_DEVICES_GET_SUCCESS: {
			return {
				items: payload,
				isLoading: false,
				error: null,
			};
		}
		case ALL_DEVICES_LOADING_ERROR: {
			return { ...state, isLoading: false, error: payload };
		}
		case "DELETE": {
			return { items: [] };
		}

		default: {
			return state;
		}
	}
}
