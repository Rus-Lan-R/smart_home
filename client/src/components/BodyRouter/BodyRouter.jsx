import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScannigDevices from "../../components/DeviceConnection/ScannigDevices/ScannigDevices";

import AddDeviceCard from "../../components/DeviceConnection/AddDevice/AddDeviceCard/AddDeviceCard";
import PrivateRoute from "../../components/Auth/PrivateRouter/PrivateRouter";

import AddRoom from "../../components/AddRoom/AddRoom";
import DevicesList from "../../components/RoomContainer/DeviceList/DeviceList";
const BodyRouter = () => {
	return (
		<Router>
			<Switch>
				<PrivateRoute exact path="/rooms/:roomName">
					<div>test</div>
					<DevicesList />
				</PrivateRoute>

				<PrivateRoute exact path="/config">
					<ScannigDevices />
				</PrivateRoute>

				<PrivateRoute exact path="/config/add-device/:deviceID">
					<AddDeviceCard />
				</PrivateRoute>

				<PrivateRoute exact path="/addRoom/">
					<AddRoom />
				</PrivateRoute>
			</Switch>
		</Router>
	);
};

export default BodyRouter;
