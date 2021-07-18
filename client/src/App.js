import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from "react";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/Auth/PrivateRouter/PrivateRouter";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignOut from "./components/Auth/SignOut/SignOut";
import CardContainer from "./components/CardContainer/CardContainer";

// import LeftMenu from "./components/LeftMenu/LeftMenu";
// import DevicesList from "./components/DeviceConnection/DevicesList";
// import RoomContainer from "./components/RoomContainer/RoomContainer";
// import HomeContainer from "./components/HomeContainer/HomeContainer";
import AddRoom from "./components/AddRoom/AddRoom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/user.action";
import ScannigDevices from "./components/DeviceConnection/ScannigDevices/ScannigDevices";

import AddDeviceCard from "./components/DeviceConnection/AddDevice/AddDeviceCard/AddDeviceCard";

import { CurrentDeviceIpContextProvider } from "./context/currentDeviceIpContext";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
	}, []);

	return (
		<Router>
			<Header />
			{/* <LeftMenu /> */}
			<Switch>
				<PrivateRoute exact path="/config">
					<CurrentDeviceIpContextProvider>
						<ScannigDevices />
					</CurrentDeviceIpContextProvider>
				</PrivateRoute>

				<PrivateRoute exact path="/config/add-device/:deviceID">
					<CurrentDeviceIpContextProvider>
						<AddDeviceCard />
					</CurrentDeviceIpContextProvider>
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
				<Route exact path="/addRoom">
					<AddRoom />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
