import {
  SCENARIOS_LOADING_START,
  SCENARIOS_GET_SUCCESS,
  SCENARIOS_LOADING_ERROR
} from '../types/scenarios.types'

export const getScenariosStart = () => ({
  type: SCENARIOS_LOADING_START,
});
export const getScenariosSuccess = (items) => ({
  type: SCENARIOS_GET_SUCCESS,
  payload: items,
});
export const getScenariosError = (err) => ({
  type: SCENARIOS_LOADING_ERROR,
  payload: err,
});

export const getScenarios = (userId) => async (dispatch) => {
  dispatch(getScenariosStart());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/scenario/${userId}`);
    const result = await response.json();
    dispatch(getScenariosSuccess(result));
  } catch (err) {
    dispatch(getScenariosError(err));
  }
};
