import { SET_DEVICES_IP, CLEAR_SCANNING_DEVICES } from "../types/scanningIP.types";
import * as apiRpiEndPoinst from "../../config/apiRpiEndPoinst";
import { enableLoader, disableLoader } from "./loader.action";

export const getIpDevices =
	(startIP = 0, scale = 10, stop = false) =>
	async (dispatch) => {
		try {
			if (!stop) {
				dispatch(enableLoader());
				const responseGetIp = await fetch(apiRpiEndPoinst.getDevices(), {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ startIP, scale }),
				});
				if (responseGetIp.ok) {
					const scanningIP = await responseGetIp.json();
					console.log(scanningIP);
					dispatch(setDevicesIp(scanningIP));
				}
			}
		} catch (error) {
			alert(error);
		}
		dispatch(disableLoader());
		if (!stop) {
			if (260 - scale > startIP + scale) dispatch(getIpDevices(startIP + scale));
		}
	};

export const setDevicesIp = (devicesIp) => ({
	type: SET_DEVICES_IP,
	payload: devicesIp,
});

export const clearScaningDevices = () => ({
	type: CLEAR_SCANNING_DEVICES,
	payload: [],
});
