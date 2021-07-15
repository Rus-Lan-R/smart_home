import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import getInitState from "./initialState";
import rootReducer from "./reducers/root.reducer";

const store = createStore(rootReducer, getInitState(), composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => {
	window.localStorage.setItem("redux", JSON.stringify(store.getState()));
});

export default store;
