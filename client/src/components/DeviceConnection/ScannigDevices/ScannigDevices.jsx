import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import DevicesList from "../DevicesList/DevicesList";
import { getIpDevices } from "../../../redux/actions/scanningIP.action";

const ScannigDevices = () => {
	const dispatch = useDispatch();

	return (
		<>
			<Button onClick={() => dispatch(getIpDevices())} variant="outlined" color="primary">
				Scan Devices
			</Button>
			<DevicesList />
		</>
	);
};

export default ScannigDevices;
