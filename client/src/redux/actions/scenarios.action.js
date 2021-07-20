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

export const getScenarios = () => async (dispatch) => {
  dispatch(getScenariosStart());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/scenario/`, {
      credentials: 'include'
    });
    const result = await response.json();
    dispatch(getScenariosSuccess(result));
  } catch (err) {
    dispatch(getScenariosError(err));
  }
};

export const selectScenario = (nameScenario) => async (dispatch) => {
  console.log(nameScenario)
  const responseChangeStatus = await fetch(`${process.env.REACT_APP_API_URL}/api/scenario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(nameScenario),
  });
  const statusScenario = await responseChangeStatus.json();
  console.log(statusScenario)
}
