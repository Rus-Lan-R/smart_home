import {
	CURRENT_MARKER_LOADING_START,
  CURRENT_MARKER_LOADING_ERROR,
  CURRENT_MARKER_GET_SUCCESS,
  CURRENT_MARKER_CLEAR,
} from "../types/currentMarker.types";

export default function currentMarkerReducer(state = {}, action) {
	const { type, payload } = action;

	switch (type) {
		case CURRENT_MARKER_LOADING_START: {
			return { ...state, isLoading: true };
		}
		case CURRENT_MARKER_GET_SUCCESS: {
			return { item: payload, isLoading: false, error: null };
		}
		case CURRENT_MARKER_LOADING_ERROR: {
			return { ...state, isLoading: false, error: payload };
		}
		case CURRENT_MARKER_CLEAR: {
			return { item: {}, isLoading: false, error: null };
		}
		default: {
			return state;
		}
	}
}
