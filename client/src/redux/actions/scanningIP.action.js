import { SET_DEVICES_IP } from "../types/scanningIP.types";
import * as apiRpiEndPoinst from "../../config/apiRpiEndPoinst";
import { enableLoader, disableLoader } from "./loader.action";

export const getIpDevices = () => async (dispatch) => {
	try {
		dispatch(enableLoader());
		console.log("send fetch");
		const responseGetIp = await fetch(apiRpiEndPoinst.getDevices());
		console.log("response");
		if (responseGetIp.ok) {
			const scanningIP = await responseGetIp.json();
			dispatch(setDevicesIp(scanningIP));
		}
	} catch (error) {
		alert(error);
	}
	dispatch(disableLoader());
};

export const setDevicesIp = (devicesIp) => ({
	type: SET_DEVICES_IP,
	payload: devicesIp,
});
