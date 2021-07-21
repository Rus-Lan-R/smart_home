import {
	SENSORS_LOADING_START,
	SENSORS_LOADING_ERROR,
	SENSORS_GET_SUCCESS,
	SENSORS_CHANGE_STATUS,
	SENSORS_CHANGE_VALUE,
} from "../types/sensors.types";

export default function deviceReducer(state = {}, action) {
	const { type, payload } = action;

	switch (type) {
		case SENSORS_LOADING_START: {
			return { ...state, isLoading: true };
		}
		case SENSORS_GET_SUCCESS: {
			return { items: payload, isLoading: false, error: null };
		}
		case SENSORS_LOADING_ERROR: {
			return { ...state, isLoading: false, error: payload };
		}
		case SENSORS_CHANGE_STATUS: {
			const updatedSensors = state.items.map((el) => {
				if (el._id === payload._id) {
					el.status = payload.status;
				}
				return el;
			});

			return { items: updatedSensors, isLoading: false, error: null };
			// return { ...state, items: updatedSensors, isLoading: false, error: null };
		}
		case SENSORS_CHANGE_VALUE: {
			const updatedSensors = state.items.map((el) => {
				if (el._id === payload._id) {
					el.value = payload.value;
				}
				return el;
			});

			return { items: updatedSensors, isLoading: false, error: null };
			// return { ...state, items: updatedSensors, isLoading: false, error: null };
		}
		case "DELETE": {
			return { items: [] };
		}

		default: {
			return state;
		}
	}
}
