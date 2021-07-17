import {
  SCENARIOS_LOADING_START,
  SCENARIOS_LOADING_ERROR,
  SCENARIOS_GET_SUCCESS
} from "../types/scenarios.types"

export default function scenarioReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case SCENARIOS_LOADING_START: {
      return { ...state, isLoading: true };
    }
    case SCENARIOS_GET_SUCCESS
      : {
        return { items: payload, isLoading: false, error: null };
      }
    case SCENARIOS_LOADING_ERROR: {
      return { ...state, isLoading: false, error: payload };
    }
    default: {
      return state;
    }
  }
}
