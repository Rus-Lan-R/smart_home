import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import DevicesList from "../DevicesList/DevicesList";
import { getIpDevices, clearScaningDevices } from "../../../redux/actions/scanningIP.action";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
	root: {
		maxWidth: 250,
		margin: 10,
	},
});

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
  const classes = useStyles();
	return (
		<>
			{loader ? (
				<Button className={classes.root} onClick={handleStop} variant="outlined" color="secondary">
					Stop Devices Scanning
				</Button>
			) : (
				<Button className={classes.root} onClick={handleStart} variant="outlined" color="primary">
					Start Devices Scanning
				</Button>
			)}

			<DevicesList />
		</>
	);
};

export default ScannigDevices;
