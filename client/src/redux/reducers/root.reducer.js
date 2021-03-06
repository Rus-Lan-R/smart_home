import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import loaderReducer from "./loader.reducer";
import sacannigIPReducer from "./scanningIP.reducer";
import deviceReducer from "./device.reducer";
import roomReducer from "./room.reducer";
import scenarioReducer from "./scenario.reducer";
import currentMarkerReducer from "./currentMarker.reducer";
import sensorsReducer from "./sensors.reducer";
import allDevicesReducer from "./allDevice.reducer";

const reducer = combineReducers({
	rooms: roomReducer,
	devices: deviceReducer,
	user: userReducer,
	scanningIP: sacannigIPReducer,
	loader: loaderReducer,
	scenarios: scenarioReducer,
  currentMarker: currentMarkerReducer,
	sensors: sensorsReducer,
	allDevices: allDevicesReducer,
});

export default reducer;
