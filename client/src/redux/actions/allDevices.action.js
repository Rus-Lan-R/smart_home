import {
	ALL_DEVICES_LOADING_START,
	ALL_DEVICES_GET_SUCCESS,
	ALL_DEVICES_LOADING_ERROR,
} from "../types/allDevices.types";

export const getAllDevicesStart = () => ({
	type: ALL_DEVICES_LOADING_START,
});
export const getAllDevicesSuccess = (items) => ({
	type: ALL_DEVICES_GET_SUCCESS,
	payload: items,
});
export const getAllDevicesError = (err) => ({
	type: ALL_DEVICES_LOADING_ERROR,
	payload: err,
});

export const getAllDevices = () => async (dispatch) => {
	dispatch(getAllDevicesStart());

	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sensors/all`, {
			credentials: "include",
		});
		const result = await response.json();
		dispatch(getAllDevicesSuccess(result));
	} catch (err) {
		dispatch(getAllDevicesError(err));
	}
};
