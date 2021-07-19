import {
	DEVICES_LOADING_START,
	DEVICES_GET_SUCCESS,
	DEVICES_LOADING_ERROR,
} from "../types/devices.types";

export const getDevicesStart = () => ({
	type: DEVICES_LOADING_START,
});
export const getDevicesSuccess = (items) => ({
	type: DEVICES_GET_SUCCESS,
	payload: items,
});
export const getDevicesError = (err) => ({
	type: DEVICES_LOADING_ERROR,
	payload: err,
});

export const getDevices = (roomID) => async (dispatch) => {
	dispatch(getDevicesStart());

	try {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/api/room/roomDevices/${roomID}`,
			{
				credentials: "include",
			},
		);
		const result = await response.json();
		dispatch(getDevicesSuccess(result));
	} catch (err) {
		dispatch(getDevicesError(err));
	}
};
