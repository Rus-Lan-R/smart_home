import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import loaderReducer from "./loader.reducer";
import sacannigIPReducer from "./scanningIP.reducer";
import deviceReducer from "./device.reducer";
import roomReducer from "./room.reducer";
import scenarioReducer from "./scenario.reducer";

const reducer = combineReducers({
	user: userReducer,
	scanningIP: sacannigIPReducer,
	loader: loaderReducer,
	devices: deviceReducer,
	rooms: roomReducer,
	scenarios: scenarioReducer,
});

export default reducer;
