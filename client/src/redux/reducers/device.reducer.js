import {
  DEVICES_LOADING_START,
  DEVICES_LOADING_ERROR,
  DEVICES_GET_SUCCESS
} from "../types/devices.types"

export default function deviceReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case DEVICES_LOADING_START: {
      return { ...state, isLoading: true };
    }
    case DEVICES_GET_SUCCESS
      : {
        return { items: payload, isLoading: false, error: null };
      }
    case DEVICES_LOADING_ERROR: {
      return { ...state, isLoading: false, error: payload };
    }
    default: {
      return state;
    }
  }
}
