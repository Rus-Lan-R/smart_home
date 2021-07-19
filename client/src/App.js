import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/user.action";
import Grid from "@material-ui/core/Grid";

import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignOut from "./components/Auth/SignOut/SignOut";

import Header from "./components/Header/Header";
// import DefaultContainer from "./components/DefaultContainer/DefaultContainer";

import ScannigDevices from "./components/DeviceConnection/ScannigDevices/ScannigDevices";

import AddDeviceCard from "./components/DeviceConnection/AddDevice/AddDeviceCard/AddDeviceCard";
import PrivateRoute from "./components/Auth/PrivateRouter/PrivateRouter";

import AddRoom from "./components/AddRoom/AddRoom";
import DevicesList from "./components/RoomContainer/DeviceList/DeviceList";
import LeftMenuRoomsList from "./components/LeftMenu/LeftMenuRoomsList/LeftMenuRoomsList";
function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(checkAuth());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Router>
			<Header />

			<Route exact path="/auth/signin">
				<SignIn />
			</Route>
			<Route exact path="/auth/signup">
				<SignUp />
			</Route>
			<Route exact path="/auth/signout">
				<SignOut />
			</Route>

			<Switch>
				<Route path="/home">
					<Grid container spacing={4}>
						<Grid item xs>
							<LeftMenuRoomsList />
						</Grid>
						<Grid item xs={9}>
							<PrivateRoute exact path="/home/addRoom/">
								<AddRoom />
							</PrivateRoute>

							<PrivateRoute exact path="/home/config">
								<ScannigDevices />
							</PrivateRoute>

							<PrivateRoute exact path="/home/config/add-device/:deviceID">
								<AddDeviceCard />
							</PrivateRoute>

							<PrivateRoute exact path="/home/rooms/:roomName">
								<DevicesList />
							</PrivateRoute>
						</Grid>
					</Grid>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
