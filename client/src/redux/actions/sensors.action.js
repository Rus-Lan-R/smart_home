import {
	SENSORS_LOADING_START,
	SENSORS_GET_SUCCESS,
	SENSORS_LOADING_ERROR,
	SENSORS_CHANGE_STATUS,
	SENSORS_CHANGE_VALUE,
} from "../types/sensors.types";

export const getSensorsStart = () => ({
	type: SENSORS_LOADING_START,
});
export const getSensorsSuccess = (items) => ({
	type: SENSORS_GET_SUCCESS,
	payload: items,
});
export const getSensorsError = (err) => ({
	type: SENSORS_LOADING_ERROR,
	payload: err,
});

export const getSensors = (roomID) => async (dispatch) => {
	dispatch(getSensorsStart());

	try {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/api/sensors/roomSensors/${roomID}`,
			{
				credentials: "include",
			},
		);
		const result = await response.json();
		dispatch(getSensorsSuccess(result));
	} catch (err) {
		dispatch(getSensorsError(err));
	}
};

export const updateSensorValue = (sensor) => ({
	type: SENSORS_CHANGE_VALUE,
	payload: sensor,
});

export const updateSensorStatus = (sensor) => ({
	type: SENSORS_CHANGE_STATUS,
	payload: sensor,
});

export const sensorsChangeValue = (deviceID, currentStatus) => async (dispatch) => {
	dispatch(getSensorsStart());
	try {
		const responseChangeStatus = await fetch(`${process.env.REACT_APP_API_URL}/api/sensors`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(deviceID, currentStatus),
		});
		const updatedSensor = await responseChangeStatus.json();

		dispatch(updateSensorValue(updatedSensor));
	} catch (error) {
		dispatch(getSensorsError(error));
	}
};

export const sensorsChangeStatus =
	({ id, status }) =>
	async (dispatch) => {
		dispatch(getSensorsStart());
		try {
			const responseChangeStatus = await fetch(`${process.env.REACT_APP_API_URL}/api/sensors`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ id, status }),
			});
			const updatedSensor = await responseChangeStatus.json();

			dispatch(updateSensorStatus(updatedSensor));
		} catch (error) {
			dispatch(getSensorsError(error));
		}
	};

export const resetMotionSensor = (sensorID) => async (dispatch) => {
	dispatch(getSensorsStart());
	try {
		const responseResetMotionSensor = await fetch(
			`${process.env.REACT_APP_API_URL}/api/sensors/movement`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include",
				body: JSON.stringify({ sensorID }),
			},
		);
		const updatedSensor = await responseResetMotionSensor.json();

		dispatch(updateSensorValue(updatedSensor));
	} catch (error) {
		dispatch(getSensorsError(error));
	}
};

// export const checkSensors = (room) => async(dispatch) => {
//   dispatch(getSensorsStart());
//   try {
// 		const responseResetMotionSensor = await fetch(
// 			`${process.env.REACT_APP_API_URL}/api/sensors`,
// 			{
// 				method: "PATCH",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 				body: JSON.stringify({ room }),
// 			},
// 		);
// 		const updatedSensor = await responseResetMotionSensor.json();

// 		dispatch(updateSensorValue(updatedSensor));
// 	} catch (error) {
// 		dispatch(getSensorsError(error));
// 	}
// }
