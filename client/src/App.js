import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from "react";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/Auth/PrivateRouter/PrivateRouter";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignOut from "./components/Auth/SignOut/SignOut";
import CardContainer from "./components/CardContainer/CardContainer";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/user.action";
import DevicesList from "./components/DeviceConnection/DevicesList";
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	return (
		<Router>
			<Header />

			<Switch>
				<PrivateRoute exact path="/config">
					<DevicesList />
				</PrivateRoute>
				<PrivateRoute exact path="/profile">
					<div>tut tipo licniy kabinet</div>
				</PrivateRoute>
				<Route exact path="/">
					<CardContainer />
				</Route>
				<Route exact path="/auth/signin">
					<SignIn />
				</Route>
				<Route exact path="/auth/signup">
					<SignUp />
				</Route>
				<Route exact path="/auth/signout">
					<SignOut />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
