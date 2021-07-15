import { combineReducers } from "redux";
import userReducer from "./user.reducer";

const reducer = combineReducers({
  user: userReducer,
});

export default reducer;
