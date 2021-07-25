import {
	ROOMS_LOADING_START,
	ROOMS_GET_SUCCESS,
	ROOMS_LOADING_ERROR,
	ROOM_ADD,
  ROOM_MARKER_UPDATE,
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

export const updateRoomMarker = (updatedMarker) => ({
	type: ROOM_MARKER_UPDATE,
  payload: {updatedMarker},
});

export const changeStatusOfRoomMarker = (updatedMarker) => async (dispatch) =>{
  dispatch(updateRoomMarker(updatedMarker))
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/markers`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify(
      updatedMarker
    ),
  });
  const result = await response.json();

};



export const addRoom = (newRoom) => ({
	type: ROOM_ADD,
	payload: { newRoom },
});

export const getRooms = () => async (dispatch) => {
	dispatch(getRoomsStart());

	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/room`, {
			credentials: "include",
		});
		const result = await response.json();
		dispatch(getRoomsSuccess(result));
	} catch (err) {
		dispatch(getRoomsError(err));
	}
};
