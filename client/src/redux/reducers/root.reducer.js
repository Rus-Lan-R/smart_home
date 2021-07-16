import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import loaderReducer from "./loader.reducer";
import sacannigIPReducer from "./scanningIP.reducer";

const reducer = combineReducers({
	user: userReducer,
	scanningIP: sacannigIPReducer,
	loader: loaderReducer,
});

export default reducer;
