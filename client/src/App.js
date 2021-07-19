import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/user.action";
import ScannigDevices from "./components/DeviceConnection/ScannigDevices/ScannigDevices";

import AddDeviceCard from "./components/DeviceConnection/AddDevice/AddDeviceCard/AddDeviceCard";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/Auth/PrivateRouter/PrivateRouter";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignOut from "./components/Auth/SignOut/SignOut";
import CardContainer from "./components/CardContainer/CardContainer";
import AddRoom from "./components/AddRoom/AddRoom";
import LeftMenu from "./components/LeftMenu/LeftMenu";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<Header />
			{/* <PrivateRoute> */}
			{/* <LeftMenu /> */}
			{/* </PrivateRoute> */}
			<Switch>
				<PrivateRoute exact path="/config">
					<ScannigDevices />
				</PrivateRoute>

				<PrivateRoute exact path="/config/add-device/:deviceID">
					<AddDeviceCard />
				</PrivateRoute>

				<PrivateRoute exact path="/profile">
					<div>tut tipo licniy kabinet</div>
				</PrivateRoute>

				<PrivateRoute exact path="/">
					<LeftMenu />
					<CardContainer />
				</PrivateRoute>

				<Route exact path="/auth/signin">
					<SignIn />
				</Route>

				<Route exact path="/auth/signup">
					<SignUp />
				</Route>
				<Route exact path="/auth/signout">
					<SignOut />
				</Route>
				<Route exact path="/addRoom">
					<AddRoom />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
