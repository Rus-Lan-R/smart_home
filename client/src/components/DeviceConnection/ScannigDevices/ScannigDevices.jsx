import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import DevicesList from "../DevicesList/DevicesList";
import { getIpDevices, clearScaningDevices } from "../../../redux/actions/scanningIP.action";

const ScannigDevices = () => {
	const dispatch = useDispatch();

	const handleStart = () => {
		dispatch(getIpDevices());
		dispatch(clearScaningDevices());
	};

	const handleStop = () => {
		dispatch(getIpDevices({ stop: true }));
	};

	const loader = useSelector((state) => state.loader);

	return (
		<>
			{loader ? (
				<Button onClick={handleStop} variant="outlined" color="primary">
					Stop Devices Scanning
				</Button>
			) : (
				<Button onClick={handleStart} variant="outlined" color="primary">
					Start Devices Scanning
				</Button>
			)}

			<DevicesList />
		</>
	);
};

export default ScannigDevices;
