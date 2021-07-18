import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import loaderReducer from "./loader.reducer";
import scanningIPReducer from "./scanningIP.reducer";

const reducer = combineReducers({
	user: userReducer,
	scanningIP: scanningIPReducer,
	loader: loaderReducer,
});

export default reducer;
