import {
  ROOMS_LOADING_START,
  ROOMS_GET_SUCCESS,
  ROOMS_LOADING_ERROR,
  ROOM_ADD,
} from "../types/rooms.types";

export const getRoomsStart = () => ({
  type: ROOMS_LOADING_START,
});
export const getRoomsSuccess = (items) => ({
  type: ROOMS_GET_SUCCESS,
  payload: items,
});
export const getRoomsError = (err) => ({
  type: ROOMS_LOADING_ERROR,
  payload: err,
});

export const addRoom = (newRoom) => ({
  type: ROOM_ADD,
  payload: { newRoom },
});

export const getRooms = () => async (dispatch) => {
  dispatch(getRoomsStart());

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/userRooms`, {
      credentials: 'include'
    });
    const result = await response.json();
    dispatch(getRoomsSuccess(result));
  } catch (err) {
    dispatch(getRoomsError(err));
  }
};
