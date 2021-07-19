import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDevices } from "../../../redux/actions/devices.action";
import Device from "../Device/Device";
import Grid from "@material-ui/core/Grid";

export default function DevicesList() {
	const devices = useSelector((state) => state.devices.items);

	const { roomName } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDevices(roomName));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roomName]);

	return (
		<Grid container direction="row" justifyContent="space-around" alignItems="center">
			{devices.map((el) => (
				<Device {...el} />
			))}
		</Grid>
	);
}
