import {
  CURRENT_MARKER_LOADING_START,
  CURRENT_MARKER_LOADING_ERROR,
  CURRENT_MARKER_GET_SUCCESS,
  CURRENT_MARKER_CLEAR,
} from '../types/currentMarker.types';

export const getCurrentMarkerStart = () => ({
  type: CURRENT_MARKER_LOADING_START,
});
export const getCurrentMarkerSuccess = (item) => ({
  type: CURRENT_MARKER_GET_SUCCESS,
  payload: item,
});
export const getCurrentMarkerError = (err) => ({
  type: CURRENT_MARKER_LOADING_ERROR,
  payload: err,
});

export const clearCurrentMarker = () => ({
  type: CURRENT_MARKER_CLEAR,
});

export const getCurrentMarker = (room) => async (dispatch) => {
  dispatch(getCurrentMarkerStart());
  try {
    const result = room;
    dispatch(getCurrentMarkerSuccess(result));
  } catch (err) {
    dispatch(getCurrentMarkerError(err));
  }
};
